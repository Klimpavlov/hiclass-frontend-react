import React from "react";

const IdeasForMeeting = () => {
    return (
        <>
            <div className="flex flex-col items-center text-center gap-6 px-4 max-w-[720px]">
                <h2 className="text-white text-[48px] font-normal">
                    Выберите идею для встречи или придумайте свою!
                </h2>
                <p className="text-[#ECEDEF] text-[16px] leading-6">
                    Творческие учителя - творческие уроки!
                </p>
            </div>
            <div className="max-w-[800px]">
                <h2 className="text-white text-[36px] font-normal text-center">
                    "Teaching with Hi, Class is a joy. The platform enhance the learning experience for both me and my students. It's a place where my passion for teaching truly thrives."
                </h2>
            </div>
            <div className="flex flex-col items-center text-center gap-2 max-w-[720px]">
                <Image />
                <span className='text-[16px] font-semibold'>Liza Ermakova</span>
                <span>Teacher</span>
            </div>
        </>
    );
};

export default IdeasForMeeting;