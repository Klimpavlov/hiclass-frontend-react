import React, {useEffect, useState} from "react";
import Image from "next/image";
import putBannerImage from "@/app/putBanner/putBannerImage";
import {getUserProfile} from "@/app/api/getUserProfile/getUserProfile";
import ApplyButton from "@/components/Buttons/ApplyButton";

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

    return (
        <div className="flex items-center relative justify-center px-4 md:px-8 py-8 md:py-16 bg-gray-100">
            <div className="button text-center">
                <input type="file" onChange={getFile}/>
                {banner && (
                    <div className="w-full">
                        <Image
                            src={banner}
                            alt="banner photo"
                            layout="fill"
                            objectFit="contain"
                        />
                        {/*<div className="absolute">*/}
                        {/*    <div className="space-x-2">*/}
                        {/*        <ApplyButton buttonText="change" />*/}
                        {/*        <ApplyButton buttonText="remove" />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                )}
                {file && (
                    <div className="w-full">
                        <Image
                            src={file}
                            alt="banner photo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;