"use client";

import React from "react";
import Image from "next/image";
import {ProjectDetails} from "@/app/Types/ProjectTypes";
import missingImage from "@/assets/images/missing.png";
import styles from "./components.projects.module.css";
import { useRouter } from "next/navigation";
import { FaGolang, FaDocker, FaFlutter } from "react-icons/fa6";
import { IconType } from "react-icons";

interface ProjectCardProps {
    project: ProjectDetails;
}

const iconMap: Record<string, IconType> = {
    FaGolang,
    FaDocker,
    FaFlutter,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [imgSrc, setImgSrc] = React.useState(project.icon.isImage ? project.icon.src || "" : "");
    const router = useRouter();

    const handleImageError = () => {
        setImgSrc("");
    };

    const handleCardClick = () => {
        router.push(`/projects/${project.id}`);
    };

    const renderVisual = () => {
        if (project.icon.isImage && imgSrc) {
            return (
                <Image
                    className={styles.projectImage}
                    src={imgSrc}
                    alt={project.name}
                    width={150}
                    height={150}
                    onError={handleImageError}
                />
            );
        }

        if (!project.icon.isImage && project.icon.iconName) {
            const IconComponent = iconMap[project.icon.iconName];
            if (IconComponent) {
                return <IconComponent size={project.icon.size || 48} color={project.icon.color || "#000"} />;
            }
        }

        return (
            <Image
                className={styles.projectImage}
                src={missingImage}
                alt="Missing"
                width={150}
                height={150}
            />
        );
    };

    return (
        <div className={styles.projectCard} onClick={handleCardClick} style={{ cursor: "pointer" }}>
            {renderVisual()}
            <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
            </div>
        </div>
    );
};
