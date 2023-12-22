import React from "react";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
const ClassesSection = () => {
    return (
        <div className='p-4 sm:p-8 md:p-12 lg:p-16'>
            <div className='flex justify-between'>
                <div className='font-bold'>Most popular classes in <span className='text-green-700'>Geography</span></div>
                <div className='text-green-700'>See all</div>
            </div>
            <div className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ClassPreview className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
                <ClassPreview className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
                <ClassPreview className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />
            </div>
        </div>
    )
}

export default ClassesSection