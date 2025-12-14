"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { ProjectDetails } from '../Types/ProjectTypes';

interface ProjectContextType {
    projects: ProjectDetails[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
};

interface ProjectProviderProps {
    children: ReactNode;
    projects: ProjectDetails[];
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, projects }) => {
    return (
        <ProjectContext.Provider value={{ projects }}>
            {children}
        </ProjectContext.Provider>
    );
};
