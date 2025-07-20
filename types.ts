export interface IconProps {
    height: number;
    width: number;
    fill?: string;
    stroke?: string;
}

export interface ToastProps {
    variant : "default" | "success" | "error" | "warning" | "info";
    message: string;
}