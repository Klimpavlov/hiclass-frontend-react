'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";
import Link from "next/link";
import UserProfileChatBtn from "@/components/Buttons/UserProfileChatBtn";
import UserProfileSendInviteBtn from "@/components/Buttons/UserProfileSendInvite";
import Image from "next/image";
import {useTranslations} from "next-intl";

const OtherUserInfo = ({username, languageTitles, email, userAvatar, userDescription, country, disciplines, toast}) => {
    const t = useTranslations("OtherUserProfile");


    return (
        <div className='sm:w-1/3 flex flex-col gap-3'>
            <div className="avatar-container">
                <Image
                    className="rounded-full w-36 h-36"
                    src={userAvatar}
                    alt="user-avatar"
                    width={200}
                    height={200}
                />
            </div>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>{username}</div>
            <div className='raiting'></div>
            <div className='email text-gray-600'>{email}</div>
            <div className="languages">{t("speaks", {languages: languageTitles.join(", ")})}</div>
            <div className='aboutUser '>{userDescription}</div>
            <div className='country'></div>
            <div className='w-full'><UserProfileSendInviteBtn toast={toast} buttonText={t("sendInvite")}/></div>
            <div className='w-full'><UserProfileChatBtn buttonText={t("chatWith")}/></div>
            <div className='location'>{country}</div>
            <div className='tags flex flex-wrap gap-2'>
                {disciplines.map((title) => (
                    <Tag key={title} text={title}></Tag>
                ))}
            </div>
        </div>);
};

export default OtherUserInfo;