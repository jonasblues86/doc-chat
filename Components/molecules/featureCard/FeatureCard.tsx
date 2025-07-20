import Icon from "@/Components/atoms/Icons/Icon";
import { IconVariant } from "@/enums";
interface FeatureCardProps{
    title: string;
    description: string;
    icon: IconVariant;
}

const FeatureCard = ({title, description, icon}: FeatureCardProps) => {
    return (
        <div className="hover:shadow-md transition-shadow animate-slide-in motion-safe:animate-show bg-white border-gray-200 border rounded-xl pt-8 pr-8 pb-8 pl-8 shadow-sm">
            <Icon variant={icon} height={20} width={20} stroke="black"/>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{description}</p>
           
        </div>
    );
};

export default FeatureCard;