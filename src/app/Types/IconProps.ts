import { StaticImageData } from "next/image";

export interface IconProps {
    isImage: boolean;

    // Image
    src?: string | StaticImageData;

    // Icon
    iconName?: string;
    color?: string;
    size?: number;
}