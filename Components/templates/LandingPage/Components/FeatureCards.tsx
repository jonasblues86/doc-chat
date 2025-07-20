import FeatureCard from "@/Components/molecules/featureCard/FeatureCard"
import { IconVariant } from "@/enums"

interface FeatureCardProps{
    title: string;
    description: string;
    icon: IconVariant;
}


const FeatureCards = () => {
    {/* TODO : Chnage the feature card Icons */}
    const featureCards: FeatureCardProps[] = [
        {
            title: "Drag & drop upload",
            description: "Upload PDFs, slides, and more with just a few clicks.",
            icon: IconVariant.FILE_SEARCH
        },
        {
            title: "Natural Conversation",
            description: "Ask anything — from summaries to deep dives — just like messaging a teammate.",
            icon: IconVariant.FILE_SEARCH
        },
        {
            title: "Enterprise-grade Privacy",
            description: "All documents stay encrypted. Your data never trains external models.",
            icon: IconVariant.FILE_SEARCH
        }
    ]

    return (

        
     <section className="mx-auto mt-24 max-w-6xl px-6 grid lg:grid-cols-3 gap-12">
        {featureCards.map((featureCard, index) => (
            <FeatureCard key={index} title={featureCard.title} description={featureCard.description} icon={featureCard.icon} />
        ))}
    </section>
  )
}

export default FeatureCards