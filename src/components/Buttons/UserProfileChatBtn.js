import React from "react";

const UserProfileChatBtn = ({buttonText}) => {
    return (
        <div>
            <div className="flex justify-center items-center cursor-pointer py-3 px-5 rounded-lg border border-gray-400">
                {buttonText}
            </div>
        </div>

    )
}

export default UserProfileChatBtn