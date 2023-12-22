import React from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
const UserInfo = () => {
    return (
        <div className='w-384 sm:w-1/3 lg:w-1/4 flex
        flex-col gap-4 mx-auto sm:ml-0 lg:ml-28'>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>Klim Pavlov</div>
            <div className='raiting'></div>
            <div className='languages'>Speaks Russian, English</div>
            <div className='aboutUser '>Lorem ipsum dolor sit amet consectetur.
                Donec imperdiet vivamus id egestas.
                Elit vulputate pellentesque a amet. Sed etiam platea suscipit </div>
            <div className='country'>Minsk, Belarus</div>
            <div className='time'>14:10 local time</div>
            <div className='w-full'><EditProfileButton/></div>
            <div className="show-experts flex flex-col sm:flex-row items-center justify-start">
                <Switch/>
                <span className="ml-0 mt-2 sm:ml-4 sm:mt-0">Available as an expert</span>
            </div>
            <div className='flex justify-between'>
                <div>Position</div>
                <div className='text-green-800'>Verify</div>
            </div>
            <div className='location'>Gymnasium No. 2, Minsk, Belarus</div>
            <div className='tags flex flex-wrap gap-2'>
                <Tag text='Geography'/>
                <Tag text='Maths'/>
                <Tag text='English'/>
                <Tag text='French'/>
            </div>
        </div>
    )

}

export default UserInfo