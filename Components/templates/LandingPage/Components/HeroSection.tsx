import Button from "@/Components/atoms/Button/Button";
import { ButtonVariant, ButtonSize } from "@/enums";

const HeroSection = () => {
    return (
            
        <section className="max-w-4xl lg:px-0 text-center mr-auto ml-auto pr-6 pl-6">
                <h1 className="md:text-6xl bg-clip-text animate-fade-in motion-safe:animate-show text-4xl font-semibold text-transparent tracking-tight bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500">Conversational power for every document</h1>
                {/* SUB-TITLE */}
                <p className="mt-6 text-lg text-gray-600 animate-fade-in motion-safe:animate-show">Upload, chat and unlock insights from PDFs, slides & more — instantly powered by AI.</p>
                
                {/* BUTTONS */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center animate-fade-in motion-safe:animate-show gap-2">
                    <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.LARGE}>Get Started</Button>
                    <Button variant={ButtonVariant.VANILLA} size={ButtonSize.LARGE}>Learn More</Button>
                </div>
            </section>
    )
}

export default HeroSection