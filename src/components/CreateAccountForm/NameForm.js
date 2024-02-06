import React, {useState} from "react";
import InputForm from "@/components/Inputs/InputForm";
import postCreateAccount from "@/app/createAccount/postCreateAccount/postCreateAccount";
import ContinueButton from "@/components/Buttons/ContinueButton";

const NameForm = ({title, subtitle}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');



    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{title}</div>
                    <div className=" ">{subtitle}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText="First name" placeholderText="Enter your first name"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       />
                        </div>
                        <InputForm inputFormText="Last name" placeholderText="Enter your last name"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <ContinueButton buttonText='Continue'/>
                </div>
            </div>
        </div>
    )
}

export default NameForm