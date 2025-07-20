import { ToastVariant } from "@/enums"
import { ToastProps } from "@/types"

const Toast = ({ variant, message }: ToastProps) => {
    
    switch (variant) {
        case ToastVariant.DEFAULT:
            return (
                <div className="w-xs bg-gray-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
            )
        case ToastVariant.SUCCESS:
            return (
                <div className="w-xs bg-green-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-green-500">{message}</p>
                </div>
            )
        case ToastVariant.ERROR:
            return (
                <div className="w-xs bg-red-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-red-500">{message}</p>
                </div>
            )
        case ToastVariant.WARNING:
            return (
                <div className="w-xs bg-yellow-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-yellow-500">{message}</p>
                </div>
            )
        case ToastVariant.INFO:
            return (
                <div className="w-xs bg-blue-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-blue-500">{message}</p>
                </div>
            )
   
    }
}

export default Toast