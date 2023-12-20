import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection"
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassInProfile from "@/components/ClassPrewiev/ClassInProfile";

export default function MyProfile() {
    return (
        <main className="">
            <Header/>
            <TopSection/>
            <div className='flex '>
                <UserInfo/>
                <div className='classesContainer mt-12 flex flex-col gap-12 mx-auto sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                    <div className='clsCntHeader flex justify-between'>
                        <div>Classes</div>
                        <div className='text-green-700'>+ Add class</div>
                    </div>
                    <div className='clsCntMain grid grid-cols-2 gap-4 '>
                        <ClassInProfile />
                        <ClassInProfile />
                        <ClassInProfile />
                    </div>
                </div>
            </div>
        </main>
    )
}