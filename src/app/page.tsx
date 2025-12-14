import React from "react";
import {ProjectGrid} from "./ui/components/projects/ProjectGrid";

export default function Home() {
    return (
        <div>
            <header style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                <h1>Projects</h1>
                <p>Projects I've built, helped build or completed half way.</p>
            </header>

            <ProjectGrid />
        </div>
    );
}
