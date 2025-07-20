import Link from "next/link";

const LandingPageMenu = () => {

    const menuItems = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Features",
            href: "/features",
        },
        {
            label: "Pricing",
            href: "/pricing",
        },
    ];
    return (
        <nav className="flex space-x-4">
            {menuItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-semibold tracking-tight"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default LandingPageMenu;