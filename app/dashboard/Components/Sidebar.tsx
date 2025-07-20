import Icon from "@/Components/atoms/Icons/Icon"
import { IconVariant } from "@/enums"

const Sidebar = () => {
    return (
        <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-200 -translate-x-full lg:translate-x-0">
            <div className="h-16 flex gap-2 border-gray-200 border-b pr-6 pl-6 items-center">
               <div className="flex items-center space-x-2">
                                   <Icon variant={IconVariant.FILE_SEARCH} height={20} width={20} stroke="black"/>
                                   <span className="text-lg font-semibold tracking-tight">doc-chat</span>
                               </div>
            </div>
        </div>
    )
}   


export default Sidebar