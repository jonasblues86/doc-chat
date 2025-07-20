import Sidebar from "./Components/Sidebar"
import Navbar from "./Components/Navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 flex flex-col lg:ml-64">
            <Sidebar />
            <main>
                <Navbar title="Dashboard" />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
