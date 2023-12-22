import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection"
import Filter from "@/components/Filter/Filter";
import Switch from "@/components/Buttons/SwitchButton";
import ClassesSection from "@/components/ClassesSection/ClassesSection";

export default function ExplorePage() {
    return (
        <main className="">
            <Header/>
            <TopSection/>
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray">
                <div className="flex flex-wrap gap-2 px-4 md:px-8">
                    <Filter buttonText="Subject" />
                    <Filter buttonText="Grade" />
                    <Filter buttonText="Language" />
                    <Filter buttonText="Location" />
                </div>
                <div className="show-experts px-4 md:px-8 flex items-center mt-4 md:mt-0">
                    <Switch />
                    <span className="ml-2 md:ml-4">Show only experts</span>
                </div>
            </div>
            <ClassesSection/>
        </main>
    )
}
