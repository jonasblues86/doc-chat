

import Header from "@/Components/atoms/Header/Header";
import LoginForm from "@/Components/atoms/LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            {/* TODO : Add Proper Header */}  
            <Header isLandingPage={false}/>
            
            <LoginForm/>
        </div>
    )
}

export default LoginPage
