import React, {useEffect, useRef, useState} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import DeleteAccBtn from "@/components/Buttons/DeleteAccBtn";
import putUpdateEmail from "@/app/[locale]/updateUser/updateEmail/putUpdateEmail";
import putUpdatePassword from "@/app/[locale]/updateUser/updatePassword/putUpdatePassword";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import {ConfirmDialog} from "primereact/confirmdialog";
import DialogModal from "@/components/ConfirmDialog/ConfirmDialog";
import deleteUser from "@/app/[locale]/deleteUser/deleteUser";
import {useRouter} from "next/navigation";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";


const SettingsLogSec = () => {

    const router = useRouter();
    const toast = useRef(null);


    useEffect(() => {
        getUserInfo()
    }, [])


    async function getUserInfo() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken);
        setEmail(userProfile.email);

    }

    //email

    const [email, setEmail] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    const handleUpdateEmail = () => {
        if(!email) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        if (!validateEmail(email)) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: "Please enter a valid email address", life: 3000 });
            return;
        }
        putUpdateEmail(email, toast)
    }

    // password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Passwords do not match', life: 3000 });
        }
        else if(!oldPassword || !newPassword || !confirmNewPassword) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
        }
        else if(newPassword === confirmNewPassword) {
            await putUpdatePassword(oldPassword, newPassword, toast)
        }
    }

    // delete account

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const handleDeleteUser = async () => {
       await deleteUser(successRedirect, toast)
    }

    const successRedirect = () => {
        router.push("/signUp");
    };

    // translation

    const t = useTranslations('LoginSecurity');

    return (
        <>
            <div className='section-email py-8'>
                <ErrorNotification ref={toast}/>
                <SettingsSection title={t("email")}
                                 details={t("emailDetails")}/>
                <div className='py-8'>
                    <InputForm inputFormText={t("email")} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <ApplyButton buttonText={t("update")} onApply={handleUpdateEmail}/>
                </div>
            </div>
            <div className='section-pass-reset py-8'>
                <SettingsSection title={t("resetPassword")}
                                 details={t("resetPasswordDetails")}/>
                <div className='py-8'>
                    <InputForm isPassword={true} inputFormText={t("oldPassword")}
                               placeholderText={t("enterOldPassword")}
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