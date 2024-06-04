import React, {useEffect, useState} from "react";
import Image from "next/image";
import putBannerImage from "@/app/[locale]/putBanner/putBannerImage";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import ApplyButton from "@/components/Buttons/ApplyButton";
import imgSrc from '../Banner/Banner.jpg';
import {useTranslations} from "next-intl";

const Banner = () => {
    const [file, setFile] = useState();

    function getFile(event) {
        const selectedFile = event.target.files[0];
        setFile(URL.createObjectURL(selectedFile));
        putBannerImage(selectedFile);
    }

    const [banner, setBanner] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken)
        console.log(userProfile);

        setBanner(userProfile.bannerImageUrl)
    }

    // translation

    const t = useTranslations("MyProfile");

    return (
        <div className="hidden sm:flex items-center relative justify-center
         h-60 md:h-64 px-4 md:px-8 py-8 md:py-16 bg-gray-100">
            <div className="button text-center group">
                <input type="file" onChange={getFile}/>
                {banner ? (
                    <Image
                        src={banner}
                        alt="banner photo"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                ) : (
                    <Image
                        src={imgSrc}
                        alt="default banner photo"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                )}
                {file && (
                    <div className="w-full">
                        <Image
                            src={file}
                            alt="banner photo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ApplyButton buttonText={t("replaceBtn")} onApply={() => document.querySelector('input[type="file"]').click()}/>
                </div>
            </div>
        </div>
    );
};

export default Banner;



// <div className="absolute">
//  <div className="space-x-2">
//    <ApplyButton buttonText="change" />
//       <ApplyButton buttonText="remove" />
//    </div>
// </div>