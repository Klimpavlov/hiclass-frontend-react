'use client';

import React from "react";
import Image from "next/image";
import imgDefaultClass from "@/components/ClassPreview/defaultClassImage.jpg";
import defaultUserImage from "@/components/UserInfo/avatar-default.svg";
import Tag from "@/components/Tags/Tag";
import {useTranslations} from "next-intl";

const ExpertPreview = ({photo, userAvatar, username, tags}) => {

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
                <div className='flex justify-between'>
                    <div className="flex flex-wrap gap-2">
                        <div>{tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpertPreview