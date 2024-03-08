'use client';

import React, {useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {useRouter} from "next/navigation";
import OtherUserInfo from "@/components/OtherUserInfo/OtherUserInfo";

export default function UserProfile({username}) {
    // const router = useRouter();
    // const { username } = router.query;
console.log(localStorage.getItem('selectedTeacherEmail'))
    return (
        <main className="">
            <Header/>
            <TopSection/>
            <div className='flex flex-col sm:flex-row p-4 md:p-28'>
                <OtherUserInfo username={username}/>
                <div className='classesContainer mt-12 flex flex-col gap-12 sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                    <div className='clsCntHeader flex justify-between'>
                        <div className=''>Classes</div>
                        <div className='text-green-700 cursor-pointer'>

                        </div>
                    </div>
                    <div className='clsCntMain sm:grid grid-cols-2 gap-4 flex flex-col'>

                    </div>
                </div>
            </div>
        </main>
    );
}