import Image from "next/image";
import img from "@/public/doc-chat.jpg"

const LandingPageImage = () => {
    return (
        <div className="mx-auto mt-24 max-w-6xl px-6">
            <Image src={img} alt="doc-chat" height={500} width={500} priority className="w-full h-full object-cover animate-blur-in motion-safe:animate-show border-gray-200 border rounded-xl shadow-lg"/>
        </div>
    );
};

export default LandingPageImage;