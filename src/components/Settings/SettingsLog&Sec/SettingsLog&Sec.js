import React, {useEffect, useRef, useState} from "react";
import SettingsSection from "@/components/Settings/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import DeleteAccBtn from "@/components/Buttons/DeleteAccBtn";
import putUpdateEmail from "@/app/[locale]/api/user/editUser/updateEmail/putUpdateEmail";
import putUpdatePassword from "@/app/[locale]/api/user/editUser/updatePassword/putUpdatePassword";
import {getUserProfile} from "@/app/[locale]/api/user/getUserProfile/getUserProfile";
import {ConfirmDialog} from "primereact/confirmdialog";
import DialogModal from "@/components/ConfirmDialog/ConfirmDialog";
import deleteUser from "@/app/[locale]/api/user/deleteUser/deleteUser";
import {usePathname, useRouter} from "next/navigation";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import postReverifyEmail from "@/app/[locale]/signUp/verifyEmail/reVerifyEmail/postReVerifyEmail";
import putSetPassword from "@/app/[locale]/api/user/editUser/putSetPassword/putSetPassword";
import Cookies from "js-cookie";


const SettingsLogSec = () => {

    const router = useRouter();
    const toast = useRef(null);
    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    // translation

    const t = useTranslations('LoginSecurity');
    const deleteUserToastTranslations = useTranslations('DialogModal.DeleteAccount');
    const errorToasts = useTranslations('DialogModal.Error');
    const passwordsToasts = useTranslations('DialogModal.Passwords');
    const updateUserToasts = useTranslations('DialogModal.EditUser');

    const [isPasswordSet, setIsPasswordSet] = useState(false);

    async function getUserInfo() {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken =  Cookies.get('accessToken');
        const userProfile = await getUserProfile(accessToken);
        console.log(userProfile);
        if (userProfile.isPasswordSet === true) {
            setIsPasswordSet(true)
        }
        // setEmail(userProfile.email);
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    console.log(isPasswordSet)

    //update email

    // const [email, setEmail] = useState('');

    // const validateEmail = (email) => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailPattern.test(email);
    // };
    // const handleUpdateEmail = async () => {
    //     if(!email) {
    //         toast.current.show({ severity: 'error', summary: errorToasts("error"), detail: errorToasts("emptyFields"), life: 3000 });
    //         return;
    //     }
    //     if (!validateEmail(email)) {
    //         toast.current.show({ severity: 'error', summary: errorToasts("error"), detail: errorToasts("validEmail"), life: 3000 });
    //         return;
    //     }
    //
    //     const success= await putUpdateEmail(email, toast)
    //
    //     if (success) {
    //         postReverifyEmail(email, toast, errorToasts, updateUserToasts)
    //     }
    //
    // }

    // set password
    const [password, setPassword] = useState('');

    const handleSetPassword = async () => {
        if (!password && isPasswordSet === false) {
            toast.current.show({ severity: 'error', summary: passwordsToasts("error"), detail: passwordsToasts("emptyFields"), life: 3000 });
        }
        if (isPasswordSet === true) {
            toast.current.show({
                severity: 'error',
                summary: errorToasts("error"),
                detail: errorToasts("passwordIsSet"),
                life: 3000
            });
        } else {
            await putSetPassword(password, toast, passwordsToasts, errorToasts)
        }
    }

    // change password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            toast.current.show({ severity: 'error', summary: passwordsToasts("error"), detail: passwordsToasts("passwordsDontMatch"), life: 3000 });
        }
        else if(!oldPassword || !newPassword || !confirmNewPassword) {
            toast.current.show({ severity: 'error', summary: passwordsToasts("error"), detail: passwordsToasts("emptyFields"), life: 3000 });
        }
        else if(newPassword === confirmNewPassword) {
            await putUpdatePassword(oldPassword, newPassword, toast, passwordsToasts)
        }
    }

    // delete account

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const handleDeleteUser = async () => {
       await deleteUser(successRedirect, toast, deleteUserToastTranslations)
    }

    const successRedirect = () => {
        router.push("/signUp");
    };

    return (
        <>
            <div className='section-email'>
                <ErrorNotification ref={toast}/>
                {/*<SettingsSection title={t("email")}*/}
                {/*                 details={t("emailDetails")}/>*/}
                {/*<div className='py-8'>*/}
                {/*    <InputForm inputFormText={t("email")} value={email} onChange={(e) => setEmail(e.target.value)}/>*/}
                {/*    <ApplyButton buttonText={t("update")} onApply={handleUpdateEmail}/>*/}
                {/*</div>*/}
            </div>
            <div className='section-set-password py-8'>
                <SettingsSection title={t("setPassword")}
                                 details={t("setPasswordDetails")}/>
                <div className='py-8'>
                    <InputForm isPassword={true}
                               inputFormText={t("newPassword")}
                               placeholderText={t("enterNewPassword")}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <ApplyButton buttonText={t("update")} onApply={handleSetPassword}/>
                </div>
            </div>
            <div className='section-pass-reset py-8'>
                <SettingsSection title={t("resetPassword")}
                                 details={t("resetPasswordDetails")}/>
                <div className='py-8'>
                    <InputForm isPassword={true} inputFormText={t("oldPassword")}
                               placeholderText={t("enterOldPassword")}
                               optionalFormText={t("forgetPassword")}
                               link={`/${locale}/signIn/forgetPassword`}
                               onChange={(e) => setOldPassword(e.target.value)}/>
                    <InputForm isPassword={true} inputFormText={t("newPassword")} placeholderText={t("enterNewPassword")}
                               onChange={(e) => setNewPassword(e.target.value)}/>
                    <InputForm isPassword={true} inputFormText={t("confirmNewPassword")}
                               placeholderText={t("reEnterNewPassword")}
                               onChange={(e)=> setConfirmNewPassword(e.target.value)}/>
                    <ApplyButton buttonText={t("changePassword")} onApply={handleUpdatePassword}/>
                </div>
            </div>
            <div className='section-pass-reset py-8'>
                <SettingsSection title={t("deleteAccount")} details={t("deleteAccountDetails")}/>
                <div className=''>
                    <DeleteAccBtn buttonText={t("deleteAccountBtn")} onApply={toggleDeleteModal}/>
                </div>
                {isDeleteModalOpen && (
                    <DialogModal setIsModalOpen={setIsDeleteModalOpen}
                                 postDelete={handleDeleteUser}
                                 toast={toast}/>
                )}
            </div>
        </>
    )
}

export default SettingsLogSec