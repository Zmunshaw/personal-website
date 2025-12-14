"use client";

import {ProjectCard} from "./ProjectCard";
import styles from "./components.projects.module.css";
import {useProjects} from "../../../context/ProjectContext";

const COLUMNS = 3;

export const ProjectGrid: React.FC = () => {
    const { projects } = useProjects();
    const rows = [];

    for (let i = 0; i < projects.length; i += COLUMNS) {
        rows.push(projects.slice(i, i + COLUMNS));
    }

    return (
        <div className={styles.div}>
            <table className={styles.table}>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr className={styles.tr} key={rowIndex}>
                        {row.map((project) => (
                            <td className={styles.td} key={project.name}>
                                <ProjectCard project={project} />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
