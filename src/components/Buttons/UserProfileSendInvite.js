import React from "react";

const UserProfileSendInviteBtn = ({buttonText}) => {
    return (
        <div>
            <div className="flex justify-center items-center bg-green-900 text-white py-3 px-5 rounded-lg border border-gray-400">
                {buttonText}
            </div>
        </div>

    )
}

export default UserProfileSendInviteBtn