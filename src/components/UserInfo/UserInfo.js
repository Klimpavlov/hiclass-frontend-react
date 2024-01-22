'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";

const UserInfo = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [languageTitles, setLanguageTitles] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const response = await axios.get(
                "http://localhost:7280/api/User/get-userprofile",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwYjkwNWEzMy1kNTQxLT" +
                            "Q0M2ItYTUzMy1hYTkwZGJmOWE3NmMiLCJlbWFpbCI6IktsaW1wYXVsYXVAaWNsb3V" +
                            "kLmNvbSIsImp0aSI6IjExNzRkMDA2LTZhZTAtNDJlMC1iODBjLWNiNTZkZGQyOGFhNyIsImlhdC" +
                            "I6MTcwNTkyNDQzMiwiaXNWZXJpZmllZCI6IlRydWUiLCJpc0NyZWF0ZWRBY2NvdW50IjoiVHJ1ZSIsImlzQVRlYWN" +
                            "oZXIiOiJUcnVlIiwiaXNBRXhwZXJ0IjoiRmFsc2UiLCJuYmYiOjE3MDU5MjQ0MzIsImV4cCI6MTcwNjAxMDgzMiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MjgwIiwiYXVkIjoiaHR0cDovL2xv" +
                            "Y2FsaG9zdDo3MjgwIn0.ErVL-A07oKrS-31rMlTiyQAHbn7eEe-VBOje64_KriQ"
                    }
                }
            );
            console.log(response);
            console.log(response.data.value.languageTitles);

            setFirstname(response.data.value.firstName);
            setLastname(response.data.value.lastName)
            setLanguageTitles(response.data.value.languageTitles);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-384 sm:w-1/3 lg:w-1/4 flex
        flex-col gap-4 mx-auto sm:ml-0 lg:ml-28'>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>{firstname} {lastname}</div>
            <div className='raiting'></div>
            <div className="languages">Speaks {languageTitles.join(", ")}</div>
            <div className='aboutUser '>Lorem ipsum dolor sit amet consectetur.
                Donec imperdiet vivamus id egestas.
                Elit vulputate pellentesque a amet. Sed etiam platea suscipit
            </div>
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
        </div>);
};

export default UserInfo;