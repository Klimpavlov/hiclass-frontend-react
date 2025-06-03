import Image from "next/image";
import imgSrc from "@/assets/logo/HiClassLogoWhite.svg";
import React from "react";
import { Button } from "@/components/ui/button";

const HeaderLanding = () => {
    return (
        <header className="w-full max-w-[1280px] mx-auto py-6 px-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-10 text-[16px] leading-6">
                <Image src={imgSrc} alt="hiClass Logo" className="cursor-pointer" />
                <nav className="flex gap-6">
                    <div className="cursor-pointer">About us</div>
                    <div className="cursor-pointer">Inspiration</div>
                    <div className="cursor-pointer">FAQ’s</div>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="cursor-pointer">🇬🇧 English</div>
                <Button variant="primary" className="border border-white text-white">Войти</Button>
                <Button className="bg-[#FDC435] text-[#30210D]">Присоединиться</Button>
            </div>
        </header>
    );
};

export default HeaderLanding;
