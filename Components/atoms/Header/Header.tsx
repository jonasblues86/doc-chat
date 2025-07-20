import LandingPageMenu from "../LandingPageMenu/LandingPageMenu";
import AuthButtons from "./Components/AuthButtons";
import Icon from "../Icons/Icon";
import { IconVariant } from "@/enums";

const Header = ({isLandingPage}: {isLandingPage: boolean}) => {
    return (
        <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl lg:px-8 flex h-16 mr-auto ml-auto pr-6 pl-6 items-center justify-between">
            {/* LOGO and NAME */}
                <div className="flex items-center space-x-2">
                    <Icon variant={IconVariant.FILE_SEARCH} height={20} width={20} stroke="black"/>
                    <span className="text-lg font-semibold tracking-tight">doc-chat</span>
                </div>
            {/* MENU */}
            {isLandingPage ? <LandingPageMenu /> : ''}

            {/* AUTH BUTTONS  */}
            <AuthButtons />
        </div>
        </header>
    );
};

export default Header;  