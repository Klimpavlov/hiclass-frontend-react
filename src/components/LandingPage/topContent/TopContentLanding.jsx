import { Button } from "@/components/ui/button";
import React from "react";

const TopContentLanding = () => {
    return (
        <div className="flex flex-col items-center text-center gap-6 px-4 py-12 max-w-[800px]">
            <h2 className="text-white text-[56px] leading-tight font-normal">
                Connect with passionate teachers<br />and experts worldwide
            </h2>
            <p className="text-[#ECEDEF] text-[16px] leading-6 max-w-[600px]">
                Let’s elevate education together with. Created by teachers, for teachers.
            </p>
            <Button className="bg-[#FDC435] text-[#30210D]">Get started</Button>
        </div>
    );
};

export default TopContentLanding;
