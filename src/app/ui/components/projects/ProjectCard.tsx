"use client";

import React from "react";
import Image from "next/image";
import {ProjectDetails, ProjectTech} from "@/app/Types/ProjectTypes";
import missingImage from "@/assets/images/missing.png";
import styles from "./components.projects.module.css";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {};

interface ProjectCardProps {
    project: ProjectDetails;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [imgSrc, setImgSrc] = React.useState(project.icon.isImage ? project.icon.src || "" : "");
    const router = useRouter();

    const handleImageError = () => {
        setImgSrc("");
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on a tech badge
        if ((e.target as HTMLElement).closest('.techBadge') ||
            (e.target as HTMLElement).closest('a[href]')) {
            return;
        }
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

    const renderTechIcon = (tech: ProjectTech) => {
        if (tech.icon.isImage && tech.icon.src) {
            return (
                <Image
                    className={styles.techIcon}
                    src={tech.icon.src}
                    alt={tech.name}
                    width={20}
                    height={20}
                />
            );
        }

        if (!tech.icon.isImage && tech.icon.iconName) {
            const IconComponent = iconMap[tech.icon.iconName];
            if (IconComponent) {
                return <IconComponent size={12} />;
            }
        }
        return null;
    };

    return (
        <div className={styles.projectCard} onClick={handleCardClick} style={{ cursor: "pointer" }}>
            {project.techs && project.techs.length > 0 && (
                <div className={styles.techBadges}>
                    {project.techs.slice(0, 6).map((tech) => (
                        tech.url ? (
                            <a
                                key={tech.id}
                                href={tech.url}
                                className={styles.techBadge}
                                data-tooltip={typeof tech.description === 'string' ? tech.description : tech.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {renderTechIcon(tech)}
                                <span className={styles.techBadgeText}>{tech.name}</span>
                            </a>
                        ) : (
                            <span
                                key={tech.id}
                                className={styles.techBadge}
                                data-tooltip={typeof tech.description === 'string' ? tech.description : tech.name}
                            >
                                {renderTechIcon(tech)}
                                <span className={styles.techBadgeText}>{tech.name}</span>
                            </span>
                        )
                    ))}
                    {project.techs.length > 6 && (
                        <span className={styles.techBadge} data-tooltip={`${project.techs.length - 6} more technologies`}>
                            +{project.techs.length - 6}
                        </span>
                    )}
                </div>
            )}
            {renderVisual()}
            <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
            </div>
        </div>
    );
};
