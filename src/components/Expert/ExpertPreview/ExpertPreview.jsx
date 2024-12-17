'use client';

import React from "react";
import Image from "next/image";
import imgDefaultClass from "@/components/Class/ClassPreview/defaultClassImage.jpg";
import defaultUserImage from "@/components/User/UserInfo/avatar-default.svg";
import Tag from "@/components/Tags/Tag";
import {useTranslations} from "next-intl";
import imgLightning from "@/components/User/UserInfo/lightning.svg";

const ExpertPreview = ({photo, userAvatar, username, tags, grades}) => {

    const gradeTranslation = useTranslations("Grade");
    const t = useTranslations("IsExpert");


    return (
        <div className='w-64'>
            <div>
                <div className="w-64 h-40 overflow-hidden rounded-2xl relative">
                    <Image
                        src={photo ? photo : imgDefaultClass}
                        alt="ExpertAvatar"
                        className="object-cover absolute inset-0 w-full h-full rounded-2xl"
                        layout="fill"
                    />

                </div>
                <div className='class-preview-header flex items-center mt-1'>
                    <Image src={imgLightning} alt={imgLightning}/>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                        <Image
                            src={userAvatar || defaultUserImage}
                            alt="userAvatar"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="username text-black font-bold cursor-pointer ml-1">{username}</div>
                </div>
                {/*<div className='flex'>*/}
                {/*    <div className='flex border rounded-xl border-cyan-600 py-1 px-2 my-6 w-auto'>*/}
                {/*        <Image src={imgLightning} alt={imgLightning}/>*/}
                {/*        <div className='ml-2 text-sky-800'>{t('expert')}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='flex justify-between mt-1'>
                    <div className="flex flex-wrap gap-2">
                        <Tag text={t('expert')}/>
                        {tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                        {grades.map((grade) => (
                            <Tag key={grade} text={grade + gradeTranslation("grade")}></Tag>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpertPreview