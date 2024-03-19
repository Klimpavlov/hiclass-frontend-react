import React, {useState} from "react";
import Tag from "@/components/Tags/Tag";
import imgSrc from '@/components/ClassPreview/class-preview-image.svg';
import Image from "next/image";

const ClassPreview = ({title, username, tags, photo }) => {
    // const {title} = classData;

    return (
        <div className="class-preview ">
            <div className="class-preview-content">
                <div className="class-preview-image ">
                    <Image src={imgSrc} alt="ClassImage" className="w-full h-auto" width={300} height={300}/>
                    {/*<Image src={photo} alt="ClassImage" className="w-full h-auto" width={300} height={300}/>*/}
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
                </div>
            </div>
        </div>
    )
}

export default ClassPreview