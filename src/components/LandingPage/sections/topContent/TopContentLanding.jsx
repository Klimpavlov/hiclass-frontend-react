import { Button } from "@/components/ui/button";
import React from "react";

const TopContentLanding = () => {
    return (
        <div className="flex flex-col items-center text-center gap-6 px-4 mt-[100px] max-w-[1000px]">
            <h2 className="text-white text-[56px] leading-tight font-normal">
                Общайтесь, учитесь и играйте с друзьями по всему миру прямо во время урока!
            </h2>
            <p className="text-[#ECEDEF] text-[16px] leading-6 max-w-[600px]">
                Создано учителями для учителей.
            </p>
            <Button className="bg-[#FDC435] text-[#30210D]">Присоединиться</Button>
        </div>
    );
};

export default TopContentLanding;
