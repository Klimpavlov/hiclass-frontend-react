import React from "react";
import Link from "next/link";

const EditProfileButton = () => {
    return (
        <Link href='/editProfile'>
            <div className="flex justify-center items-center py-3 px-5 rounded-lg border border-gray-400">
                Edit profile
            </div>
        </Link>

    )
}

export default EditProfileButton