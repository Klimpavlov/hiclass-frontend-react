import React from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import updatePersonalInfo from "@/app/updateUser/updatePersonalInfo/updatePersonalInfo";

const SettingsProfileInfo = () => {
    return (
        <>
        <div className='section-photo'>
            <SettingsSection title='Profile photo'
                             details='Your photo appears on your Profile page and is visible for Brands on your profile preview
                                                  Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.'/>
            <div className='change photo'>
                <div className='photo'></div>
                <div className='changephotoBtn'></div>
            </div>
        </div>
    <div className='section-aboutMe py-8'>
        <SettingsSection title='About me' details='Add a brief description for your profile'/>
        <div className='py-8'>
            <div className='flex flex-col md:flex-row justify-between'>
                <InputForm inputFormText='First name'/>
                <InputForm inputFormText='Last name'/>
            </div>
            <Dropdown dropdownFormText='I’m a/am'/>
            <InputForm inputFormText='Location'/>
            <InputForm inputFormText="Description"/>
            <ApplyButton buttonText='Update' onApply={updatePersonalInfo}/>
        </div>
    </div>
    <div className='section-pos-verif py-8'>
        <SettingsSection title='Position verification'
                         details='For your security, we need you to verify your identity'/>
        <div className='py-8'>
            <InputForm inputFormText='Institution name'/>
            <ApplyButton buttonText='Verify'/>
            <ClearAllButton buttonText='Update'/>
        </div>
    </div>
    <div className='section-prof-details py-8'>
        <SettingsSection title='Professional details'
                         details='Lorem ipsum dolor sit amet consectetur. Euismod nunc cursus risus at egestas. Nec mi.'
        />
        <div className='py-8'>
            <Dropdown dropdownFormText='Areas of work'/>
            <Dropdown dropdownFormText='Grades'/>
            <Dropdown dropdownFormText='Languages'/>
            <ApplyButton buttonText='Update'/>
        </div>
    </div>
        </>
    )
}

export default SettingsProfileInfo