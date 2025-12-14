import {IconProps} from "./IconProps";

export interface ProjectDetails {
    id: string;

    name: string;
    description: string;
    repository: string;
    demo?: string;

    icon: IconProps;

    type?: ProjectType;
    categories?: ProjectCategory;
    attributes?: ProjectAttribute[];
    techs?: ProjectTech[];
}

export interface ProjectType {
    id: string;

    name: string;
    description: string;
    information: string;
    icon: IconProps;
}

export interface ProjectAttribute {
    id: string;

    name: string;
    description: string;
    icon: IconProps;
}

export interface ProjectCategory {
    name: string;
    description: string;

    icon: IconProps;
}

export interface ProjectTech {
    id: string;

    name: string;
    description: string;
    icon: IconProps;
    url?: string;
}
