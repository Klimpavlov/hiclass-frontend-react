import HeaderLanding from "@/components/LandingPage/header/HeaderLanding";
import TopContentLanding from "@/components/LandingPage/topContent/TopContentLanding";

export default function LandingPage() {
    return (
        <main className="w-full">
            <section className="bg-[#216C5E] min-h-screen flex flex-col items-center">
                <HeaderLanding />
                <TopContentLanding />
            </section>
            <section className="bg-[#FDFBF5] w-full">
                {/* Следующий контент (как блок "How it works") */}
            </section>
        </main>
    );
}
