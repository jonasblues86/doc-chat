import Icon from "@/Components/atoms/Icons/Icon"
import { IconVariant } from "@/enums"

const DashboardDetailsCard = ({item, index}: {item: {title: string, subtitle: string, icon: IconVariant}, index: number}) => { 
    return (
        <div key={index} className="flex gap-4 bg-white border-gray-200 border rounded-xl pt-6 pr-6 pb-6 pl-6 shadow-sm items-center">
                    
                    <div className="p-3 rounded-lg bg-indigo-50">
                        <Icon variant={item.icon} height={20} width={20}/>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 block font-medium">{item.title}</span>
                        <span className="text-xl font-semibold tracking-tight block">{item.subtitle}</span>
                    </div>
                </div>
    )
}    

export default DashboardDetailsCard