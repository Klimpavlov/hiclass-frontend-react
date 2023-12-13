import React from "react";
import Image from "next/image";

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
        <div className="bg-gray-200 px-4 py-2 rounded-lg shadow-md">
            <div className="header-left">
                <Image src="/hiClass_logo.svg" alt="hiClass Logo" width={150} height={50} />
                <div className="menu">
                    <div className="menu-text">Discover</div>
                    <div className="menu-text">
                        <a className="profile-link" href="../createClass/emptyProfile.html">
                            My profile
                        </a>
                    </div>
                </div>
            </div>
            <div className="header-right">
                <div className="tertiary-button">
                    <img src="../images/tertiary-button.svg" alt="" />
                </div>
                <div className="profile">
                    <div className="avatar">
                        <img src="../images/avatar40x40_Online.svg" alt="" />
                    </div>
                    <div className="chevron-down">
                        <img src="../images/chevron-down.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header
