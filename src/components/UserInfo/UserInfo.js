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
    const [userDescription, setUserDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [institution, setInstitution] = useState('');
    const [disciplineTitles, setDisciplineTitles] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const response = await axios.get(
                "http://localhost:7280/api/User/get-userprofile",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwYjkwNWEzMy1kNTQxLTQ0M2ItYTUzMy1hYTkwZGJmOWE3NmMiLCJlbWFpbCI6IktsaW1wYXVsYXVAaWNsb3VkLmNvbSIsImp0aSI6ImM5YWFkYTA0LWE5MWMtNDUwYy04NjJjLWVlOGFjNjRkZGEzMiIsImlhdCI6MTcwNjAxMTQ4MSwiaXNWZXJpZmllZCI6IlRydWUiLCJpc0NyZWF0ZWRBY2NvdW50IjoiVHJ1ZSIsImlzQVRlYWNoZXIiOiJUcnVlIiwiaXNBRXhwZXJ0IjoiRmFsc2UiLCJuYmYiOjE3MDYwMTE0ODEsImV4cCI6MTcwNjA5MjIzNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MjgwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo3MjgwIn0.Uh2j9Yi_QS79zAOh5OoEgvhYakNqQPXgX71bXcxzEuU"
                    }
                }
            );
            console.log(response);
            console.log(response.data.value.languageTitles);

            setFirstname(response.data.value.firstName);
            setLastname(response.data.value.lastName)
            setLanguageTitles(response.data.value.languageTitles);
            setUserDescription(response.data.value.description);
            setCountry(response.data.value.countryTitle);
            setCity(response.data.value.cityTitle);
            setInstitution(response.data.value.institution.title);
            setDisciplineTitles(response.data.value.disciplineTitles);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='sm:w-1/3'>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>{firstname} {lastname}</div>
            <div className='raiting'></div>
            <div className="languages">Speaks {languageTitles.join(", ")}</div>
            <div className='aboutUser '>{userDescription}</div>
            <div className='country'>{city}, {country}</div>
            <div className='time'>14:10 local time</div>
            <div className='w-full'><EditProfileButton/></div>
            <div className="show-experts flex items-center">
                <Switch/>
                <span className="ml-0 mt-2 sm:ml-4 sm:mt-0">Available as an expert</span>
            </div>
            <div className='flex justify-between'>
                <div>Position</div>
                <div className='text-green-800'>Verify</div>
            </div>
            <div className='location'>{institution}</div>
            <div className='tags flex flex-wrap gap-2'>
                {disciplineTitles.map((title) => (
                    <Tag key={title} text={title}></Tag>
                ))}
            </div>
        </div>);
};

export default UserInfo;