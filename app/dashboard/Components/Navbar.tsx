const Navbar = ({title}: {title: string}) => {
    return (
        <div className="h-16 flex lg:px-8 relative bg-white/80 border-gray-200 border-b pr-6 pl-6 shadow-sm backdrop-blur items-center justify-between">
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            
            <div className="flex items-center space-x-2">
                <input type="text" placeholder="Search" className="focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm bg-gray-100 rounded-md pt-2 pr-3 pb-2 pl-9" />

                <div className="w-8 h-8 rounded-full ring-2 ring-white bg-blue-500 flex items-center justify-center">
                    U
                </div>
            </div>
        </div>
    )
}

export default Navbar