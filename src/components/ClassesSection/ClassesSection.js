import React from "react";
import ClassInProfile from "@/components/ClassPrewiev/ClassInProfile";
const ClassesSection = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <div>Most popular classes in Geography</div>
                <div className='text-green-700'>See all</div>
            </div>
            <div className='flex gap-3'>
                <ClassInProfile/>
                <ClassInProfile/>
                <ClassInProfile/>
            </div>
        </div>
    )
}

export default ClassesSection