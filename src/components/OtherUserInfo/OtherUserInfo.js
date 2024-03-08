'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";
import Link from "next/link";

const OtherUserInfo = ({username, languageTitles, userDescription}) => {


    return (
        <div className='sm:w-1/3 flex flex-col gap-3'>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>{username}</div>
            <div className='raiting'></div>
            {/*<div className="languages">Speaks {languageTitles.join(", ")}</div>*/}
            {/*<div className='aboutUser '>{userDescription}</div>*/}
            {/*<div className='country'>{city}, {country}</div>*/}
            {/*<div className='time'>14:10 local time</div>*/}
            {/*<div className='w-full'><EditProfileButton/></div>*/}
            {/*<div className="show-experts flex items-center">*/}
            {/*    <Switch/>*/}
            {/*    <span className="pl-2 sm:pl-4">Available as an expert</span>*/}
            {/*</div>*/}
            {/*<div className='flex justify-between'>*/}
            {/*    <div>Position</div>*/}
            {/*    <div className='text-green-800'>Verify</div>*/}
            {/*</div>*/}
            {/*<div className='location'>{institution}</div>*/}
            {/*<div className='tags flex flex-wrap gap-2'>*/}
            {/*    {disciplineTitles.map((title) => (*/}
            {/*        <Tag key={title} text={title}></Tag>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>);
};

export default OtherUserInfo;