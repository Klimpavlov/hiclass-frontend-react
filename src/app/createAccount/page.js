// 'use client';
//
// import React, {useState} from 'react';
// import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
// import ContinueButton from "@/components/Buttons/ContinueButton";
// import NameForm from "@/components/CreateAccountForm/NameForm";
// import PositionForm from "@/components/CreateAccountForm/PositionForm";
//
// export default function createAccount() {
//     // const [step, setStep] = useState(1);
//     //
//     // const handleContinue = () => {
//     //     setStep(step + 1)
//     // }
//
//
//
//     return (
//         <main>
//             <RegistrationHeader/>
//             <div>
//                 {step === 1 && <NameForm title='Your full name'
//                                          subtitle='Enter your first and last name to get your account up and running.'/>
//                 }
//                 {step === 2 && <PositionForm title='Welcome !'
//                                              subtitle='It’s great to have you with us! To help us optimise your
//                                               experience, tell us what you plan to use WonderWorld for.'/>
//                 }
//             </div>
//             {/*<div className='flex flex-col items-center justify-center'>*/}
//             {/*    <div className="content flex flex-col items-center w-full*/}
//             {/* max-w-screen-sm px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32">*/}
//             {/*        <ContinueButton buttonText="Continue" onClick={handleContinue}/>*/}
//
//             {/*    </div>*/}
//             {/*</div>*/}
//         </main>
//     )
// }