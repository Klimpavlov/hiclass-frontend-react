import HeaderLanding from "@/components/LandingPage/header/HeaderLanding";
import TopContentLanding from "@/components/LandingPage/sections/topContent/TopContentLanding";
import topClassImage from "@/assets/images/ChatGPT_Image_2_class.png";
import Image from "next/image";
import HowItWorks from "@/components/LandingPage/sections/howItWorks/HowItWorks";

export default function LandingPage() {
    return (
        <main>
            <section className="relative bg-[#216C5E] min-h-screen flex flex-col items-center">
                <HeaderLanding />
                <TopContentLanding />
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
                    <Image src={topClassImage}  alt={'Top Class Image'} width={800} height={400} priority/>
                </div>
            </section>

            <section className="bg-[#FDFBF5] pt-[350px] min-h-screen flex flex-col items-center">
                <HowItWorks />
            </section>
        </main>
    );
}
