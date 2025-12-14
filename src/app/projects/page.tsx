import React from "react";
import {ProjectGrid} from "../ui/components/projects/ProjectGrid";

export const revalidate = 3600; // Revalidate every hour

export default function ProjectsPage() {
    return (
        <div>
            <header>
                <h1>Projects</h1>
                <p>Projects I've built, helped build or completed half way.</p>
            </header>

            <ProjectGrid />
        </div>
    );
}