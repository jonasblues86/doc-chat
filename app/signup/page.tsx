import Header from "@/Components/atoms/Header/Header"
import SignupForm from "@/Components/atoms/SignupForm/SignupForm"

const SignUp = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            {/* TODO : Add Proper Header */}  
            <Header isLandingPage={false}/>
            
            <SignupForm/>
        </div>
    )
}

export default SignUp