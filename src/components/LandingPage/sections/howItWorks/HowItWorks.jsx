import React from "react";
import CheckCircleIcon from "@/assets/icons/CheckCircleIcon.svg"
import Image from "next/image";
import step1Image from "@/assets/images/HowItWorksStep1.png"
import step2Image from "@/assets/images/HowItWorksStep2.png"
import step3Image from "@/assets/images/HowItWorksStep3.png"

const HowItWorks = () => {
    return (
        <>
            <div className="flex flex-col items-center text-center gap-6 px-4 max-w-[720px]">
                <h2 className="text-[#0C0F12] text-[48px] font-normal">
                    Как это работает
                </h2>
                <p className="text-[#3E4C5B] text-[16px] leading-6">
                    Мы объединяем увлеченных учителей и экспертов со всего мира, чтобы вдохновлять и обучать детей с помощью творческих онлайн-занятий.
                </p>
            </div>
            {/*Step 1*/}
            <div className={'w-full flex items-center justify-between mt-[100px]'}>
                <div className={'flex flex-col gap-3 max-w-[480px]'}>
                    <div className={'text-sm text-[#216C5E] font-medium leading-6'}>STEP 1</div>
                    <div className={'text-[40px] text-[#0C0F12] font-normal'}>Explore our diverse classes</div>
                    <div className={'text-[16px] text-[#3E4C5B] font-normal'}>Browse our diverse selection of classes taught by experts in various fields.</div>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src={step1Image} alt={'step1Image'} width={616} height={480} />
                </div>
            </div>
            {/*Step 2*/}
            <div className={'w-full flex items-center justify-between mt-[100px]'}>
                <div>
                    <Image src={step2Image} alt={'step1Image'} width={616} height={480} />
                </div>
                <div className={'flex flex-col gap-3 max-w-[480px]'}>
                    <div className={'text-sm text-[#216C5E] font-medium leading-6'}>STEP 1</div>
                    <div className={'text-[40px] text-[#0C0F12] font-normal'}>Explore our diverse classes</div>
                    <div className={'text-[16px] text-[#3E4C5B] font-normal'}>Browse our diverse selection of classes taught by experts in various fields.</div>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*Step 3*/}
            <div className={'w-full flex items-center justify-between mt-[100px]'}>
                <div className={'flex flex-col gap-3 max-w-[480px]'}>
                    <div className={'text-sm text-[#216C5E] font-medium leading-6'}>STEP 1</div>
                    <div className={'text-[40px] text-[#0C0F12] font-normal'}>Join the virtual classroom</div>
                    <div className={'text-[16px] text-[#3E4C5B] font-normal'}>Browse our diverse selection of classes taught by experts in various fields.</div>
                    <div className={'flex flex-col gap-1'}>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <Image src={CheckCircleIcon} alt="CheckCircleIcon" />
                            <span>Wide range of subjects</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src={step3Image} alt={'step3Image'} width={616} height={480} />
                </div>
            </div>
        </>
    );
};

export default HowItWorks;
