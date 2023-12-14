import React from "react";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';


// const Hero = ({heading, message}) => {
//     return (
//         <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img'>
//             <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/70 z-[2]'/>
//             <div className='p-5 text-white z-[2]'>
//                 <h2 className='text-5xl font-bold'>{heading}</h2>
//                 <p className='py-5 text-xl'>{message}</p>
//                 <button className='px-8 py-2 border'>Book</button>
//             </div>
//         </div>
//     )
// }
// export default Hero

const Header = () => {
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo" width={150} height={50} />
                <div className="flex ml-4">
                    <div className="">Discover</div>
                    <div className="ml-6">My profile</div>
                </div>
            </div>
            <div className="header-right flex items-center">
                <img src="../images/tertiary-button.svg" alt="" />
                <div className="flex">
                    <Image className='' src="/avatar40x40_Online.svg" alt="avatar-header" width={40} height={40} />
                    <Image className='' src="/chevron-down.svg" alt="profile-dropdown-button" width={20} height={20} />
                </div>
            </div>
        </div>
    );
};

export default Header
