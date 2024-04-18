import React, {useEffect, useState} from "react";
import Tag from "@/components/Tags/Tag";
import imgSrc from '@/components/ClassPreview/class-preview-image.svg';
import deleteClass from "@/app/deleteClass/deleteClass";
import Image from "next/image";
import {getClassInfo} from "@/app/api/getClassProfile/getClassInfo";

const ClassPreview = ({classId, title, username, tags, photo}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const postDeleteClass = () => {
        console.log(classId)
        deleteClass({classId})
    }

    // get Class Info



    useEffect(() => {
        getClass()
    }, [])

    async function getClass() {
        const accessToken = localStorage.getItem('accessToken');
        const classInfo = await getClassInfo(accessToken, classId)
        console.log(classInfo)
    }

    return (
        <div className="class-preview ">
            <div className="class-preview-content">
                <div className="class-preview-image ">
                    {/*<Image src={imgSrc} alt="ClassImage" className="w-full h-auto" width={300} height={300}/>*/}
                    <Image src={photo} alt="ClassImage" className="rounded-2xl" width={300} height={300}/>
                </div>
                <div className='class-preview-header'>
                    <div className="avatar">{}</div>
                    <div className="username text-black font-bold cursor-pointer">{username}</div>
                </div>
                <div className="class-preview-text"> {title}</div>
                <div className="class-preview-footer">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        {tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                    </div>
                    <div className='cursor-pointer' onClick={toggleDropdown}>three buttons</div>
                    {isDropdownOpen && (
                        <div className=''>
                            <div className='block w-20 py-2 px-4 sm:py-1 sm:px-2 text-left
                                hover:bg-gray-100 bg-gray-200 border border-gray-300
                                 rounded-lg shadow-lg cursor-pointer'>Edit
                            </div>
                            <div className='w-20 block py-2 px-4 sm:py-1 sm:px-2 text-left
                                hover:bg-gray-100 bg-gray-200 border border-gray-300
                                 rounded-lg shadow-lg cursor-pointer'
                                onClick={postDeleteClass} >Delete</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ClassPreview