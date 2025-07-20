import { DocumentStatus } from "@/enums"

const Badge = ({ status }: { status: DocumentStatus }) => {
    switch (status) {
        case DocumentStatus.PROCESSING:
            return (
                <span className="absolute -top-2 -left-2 text-[10px] leading-4 px-2 py-0.5 rounded-full ring-1 ring-inset font-medium bg-amber-100 text-amber-800 ring-amber-200 animate-pulse capitalize">
                    {status}
                </span>
            )
        case DocumentStatus.READY:
            return (
                <span className="absolute -top-2 -left-2 text-[10px] leading-4 px-2 py-0.5 rounded-full ring-1 ring-inset font-medium bg-emerald-100 text-emerald-800 ring-emerald-200 capitalize">
                    {status}
                </span>
            )
        case DocumentStatus.FAILED:
            return (
                <span className="absolute -top-2 -left-2 text-[10px] leading-4 px-2 py-0.5 rounded-full ring-1 ring-inset font-medium bg-red-100 text-red-800 ring-red-200 capitalize">
                    {status}
                </span>
            )
    }
    
}

export default Badge