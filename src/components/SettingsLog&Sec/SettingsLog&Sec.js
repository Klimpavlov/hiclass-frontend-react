import React, {useState} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import DeleteAccBtn from "@/components/Buttons/DeleteAccBtn";
import putUpdateEmail from "@/app/updateUser/updateEmail/putUpdateEmail";
import putUpdatePassword from "@/app/updateUser/updatePassword/putUpdatePassword";

const SettingsLogSec = () => {

    //email

    const [newEmail, setNewEmail] = useState('');
    const handleUpdateEmail = () => {
        putUpdateEmail(newEmail)
    }

    // password

    const [newPassword, setNewPassword] = useState('');
    const handleUpdatePassword = () => {
        putUpdatePassword(newPassword)
    }

    return (
        <>
            <div className='section-email py-8'>
                <SettingsSection title='Email address'
                                 details='Lorem ipsum dolor sit amet consectetur. Diam amet eget nam porttitor vitae non viverra.'/>
                <div className='py-8'>
                    <InputForm inputFormText='Email' onChange={(e) => setNewEmail(e.target.value)}/>
                    <ApplyButton buttonText='Update' onApply={handleUpdateEmail}/>
                </div>
            </div>
            <div className='section-pass-reset py-8'>
                <SettingsSection title='Password reset'
                                 details='Lorem ipsum dolor sit amet consectetur. Diam amet eget nam porttitor vitae non viverra.'/>
                <div className='py-8'>
                        <InputForm inputFormText='Old password' placeholderText='Enter your old password'/>
                        <InputForm inputFormText='New password' placeholderText='At least 6 characters' onChange={(e) => setNewPassword(e.target.value)}/>
                        <InputForm inputFormText='Confirm new password' placeholderText='Re-enter new password'/>
                    <ApplyButton buttonText='Change password' onApply={handleUpdatePassword}/>
                </div>
            </div>
            <div className='section-pass-reset py-8'>
                <SettingsSection title='Delete account' details='You will not be able to resotre your account'/>
                <div className=''>
                    <DeleteAccBtn buttonText='Delete account'/>
                </div>
            </div>
        </>
    )
}

export default SettingsLogSec