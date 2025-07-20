import FileSearchIcon from "./FileSearchIcon";
import FilesIcon from "./FilesIcon";
import DatabaseIcon from "./DatabaseIcon";
import TimeIcon from "./TimeIcon";
import DashboardIcon from "./DashboardIcon";
import UploadIcon from "./UploadIcon";
import OptionsIcon from "./OptionsIcon";
import { IconVariant } from "@/enums";


export default function Icon({ variant, height, width, fill, stroke }: { variant: IconVariant, height: number, width: number, fill?: string, stroke?: string }) {
    height = height || 24;
    width = width || 24;
    fill = fill || "currentColor";
    stroke = stroke || "currentColor";
    switch (variant) {
        case IconVariant.FILE_SEARCH:
            return <FileSearchIcon height={height} width={width} fill={fill} stroke={stroke} />;
        
        case IconVariant.FILES:
            return <FilesIcon height={height} width={width} fill={fill} stroke={stroke} />;

        case IconVariant.DATABASE:
            return <DatabaseIcon height={height} width={width} fill={fill} stroke={stroke} />;

        case IconVariant.TIME:
            return <TimeIcon height={height} width={width} fill={fill} stroke={stroke} />;
        
        case IconVariant.DASHBOARD:
            return <DashboardIcon height={height} width={width} fill={fill} stroke={stroke} />;
        
        case IconVariant.UPLOAD:
            return <UploadIcon height={height} width={width} fill={fill} stroke={stroke} />;
        
        case IconVariant.OPTIONS:
            return <OptionsIcon height={height} width={width} fill={fill} stroke={stroke} />;
        default:
            return null;
    }
}

