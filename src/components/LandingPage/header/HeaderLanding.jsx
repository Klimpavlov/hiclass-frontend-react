import Image from "next/image";
import imgSrc from "@/components/Header/hiClass_logo.svg";
import React from "react";
import {Button} from "@/components/ui/button";

const HeaderLanding = () => {
    return (
        <div className=''>
            <div className='flex justify-between'>
                <div className='flex items-center justify-between text-[16px] text-white font-normal leading-6'>
                    <Image src={imgSrc} alt="hiClass Logo" className='cursor-pointer'/>
                    <div>About us</div>
                    <div>Inspiration</div>
                    <div>FAQ’s</div>
                </div>
                <div className='flex items-center justify-between'>
                    <div>English</div>
                    <Button className={'bg-[#216C5E] border border-white'}>Sign in</Button>
                    <Button className={'bg-[#FDC435] text-[#30210D]'}>Start for free</Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderLanding