import React, {useState} from "react";
import Tag from "@/components/Tags/Tag";
import imgSrc from '@/components/ClassPreview/class-preview-image.svg';
import Image from "next/image";

const ClassPreview = ({classData, photo}) => {
    const {title} = classData;

    return (
        <div className="class-preview ">
            <div className="class-preview-content">
                <div className="class-preview-image ">
                    <Image src={imgSrc} alt="ClassImage" className="w-full h-auto"/>
                </div>
                <div className="class-preview-text"> {title}</div>
                <div className="class-preview-footer">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        <Tag text='Geography'/>
                        <Tag text='Maths'/>
                        <Tag text='English'/>
                        <Tag text='French'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassPreview