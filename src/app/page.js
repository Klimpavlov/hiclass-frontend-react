import Image from 'next/image'
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection"
import Filter from "@/components/Filter/Filter";

export default function ExplorePage() {
    return (
        <main className="">
            <Header/>
            <TopSection/>
            <div className='flex justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray'>
                <div className='flex gap-2 px-4 md:px-8'>
                    <Filter buttonText='Subject'/>
                    <Filter buttonText='Grade'/>
                    <Filter buttonText='Languege'/>
                    <Filter buttonText='Location'/>
                </div>
                <div className='px-4 md:px-8 flex items-center'>
                    Show only experts
                </div>
            </div>
        </main>
    )
}
