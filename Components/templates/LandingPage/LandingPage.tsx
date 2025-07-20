import Header from "@/Components/atoms/Header/Header";
import FeatureCards from "./Components/FeatureCards";
import LandingPageImage from "./Components/LandingPageImage";
import Footer from "@/Components/atoms/Footer/Footer";
import HeroSection from "./Components/HeroSection";

export default function LandingPage() {
    return (
        <main className="h-screen w-screen pt-28">
            {/* HEADER */}
            <Header isLandingPage={true}/>

            {/* Hero Section */}
            <HeroSection/>

            {/* FEATURES */}    
            <FeatureCards />
            
            {/* IMAGE */}
            <LandingPageImage/>
            
            {/* FOOTER */}
            <Footer/>
        </main>
    );
}