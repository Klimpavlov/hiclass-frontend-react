import React from "react";
import Link from "next/link";

const EditProfileButton = ({buttonText}) => {
    return (
        <Link href='/editProfile'>
            <div className="flex justify-center items-center py-3 px-5 rounded-lg border border-gray-400">
                {buttonText}
            </div>
        </Link>

    )
}

export default EditProfileButton