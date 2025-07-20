import Icon from "../Icons/Icon";
import { IconVariant } from "@/enums";

const Footer = () => { 
    return (
        <footer className="border-t border-gray-200 bg-white mt-32">
                
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 text-sm">

                    <div className="w-full">
                        <div className="flex items-center space-x-2">
                            <Icon variant={IconVariant.FILE_SEARCH} height={20} width={20} stroke="black"/>
                            <h3 className="text-lg font-semibold tracking-tight">doc-chat</h3>
                        </div>
                        <p className="leading-relaxed text-gray-500 mt-4">AI-powered conversations with your documents. Fast, private and delightful.</p>
                    </div>
                    <div className="w-full">
                        <h3 className="font-semibold tracking-tight text-gray-900">Product</h3>
                        <ul className="mt-4 space-y-2 flex flex-col">
                          
                                <li className="text-gray-500 hover:text-indigo-600 transition-colors">Features</li>
                                <li className="text-gray-500 hover:text-indigo-600 transition-colors">Pricing</li>
                                <li className="text-gray-500 hover:text-indigo-600 transition-colors">Changelogs</li>
                                <li className="text-gray-500 hover:text-indigo-600 transition-colors">Integrations</li>
                            
                        </ul>
                    </div>
                    
                    <div className="w-full">
                        <h3 className="font-semibold tracking-tight text-gray-900">Stay in touch</h3>
                        
                        <p className="mt-4 text-gray-500">Subscribe for product updates.</p>
                        
                        <form action="" className="flex mt-4">
                            <input type="email" placeholder="Enter your email" className="p-2 border border-gray-200 rounded-md"/>
                            <button type="submit" className="p-2 border border-gray-200 rounded-md">Subscribe</button>
                        </form>

                        {/* SOCILAL ICONS */}
                        <div className="flex mt-4 space-x-6">

                        {/* TODO : Add Social Icons    */}
                        {[1,2,3].map((item, index) => (
                            <Icon key={index} variant={IconVariant.FILE_SEARCH} height={20} width={20} stroke="black"/>
                        ))}
                        </div>
                    </div>  
                </div>
                <div className="text-xs text-gray-500 text-center border-gray-200 border-t pt-6 pb-6">
                    © 2025 doc-chat. All rights reserved.
                </div>
                
            </footer>
    )
}
    

export default Footer