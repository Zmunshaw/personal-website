import { ProjectDetails } from "../../Types/ProjectTypes";
import CSLogo from "@/assets/images/cs-logo.png"
import TSLogo from "@/assets/images/ts-logo.png"

export const projects: ProjectDetails[] = [
    {
        id: "0",
        name: "Portfolio Site",
        description: "A personal portfolio website showcasing projects, skills, and experience. Built with a modern frontend stack and designed for responsiveness and clean presentation.",
        repository: "https://github.com/Zmunshaw/PortfolioSite",
        demo: "https://zacharymunshaw.dev/guest-dashboard",
        icon: {
            isImage: true,
            src: CSLogo,
        },
        techs: [
            { id: "1", name: "Next.js", description: "React framework", icon: { isImage: false, iconName: "SiNextdotjs" } },
            { id: "2", name: "TypeScript", description: "Type-safe JavaScript", icon: { isImage: false, iconName: "SiTypescript" } },
            { id: "3", name: "Tailwind", description: "CSS framework", icon: { isImage: false, iconName: "SiTailwindcss" } },
        ],
    },
    {
        id: "1",
        name: "Book Store",
        description: "A book store application that allows users to browse, view, and manage books. Focused on practicing CRUD operations, UI structure, and frontend logic.",
        repository: "https://github.com/Zmunshaw/book_store",
        demo: "",
        icon: {
            isImage: false,
            iconName: "FaFlutter",
            color: "#2496ED",
            size: 150,
        },
        techs: [
            { id: "4", name: "Flutter", description: "Mobile framework", icon: { isImage: false, iconName: "FaFlutter" } },
            { id: "5", name: "Dart", description: "Programming language", icon: { isImage: false } },
        ],
    },
    {
        id: "2",
        name: "Jenga Docker Stack",
        description: "is a personalized Docker-based home lab for development, media, and data automation." +
            " It integrates GitLab, VSCodeCloud, SonarQube, and AI tools for coding;" +
            " Plex, NextCloud, and Calibre-Web for media and personal cloud; and Postgres, Redis, FileFlows," +
            " and torrent/news automation for data management. Overengineered and experimental, it's designed" +
            " for learning, exploration, and streamlining personal workflows.",
        repository: "https://github.com/Zmunshaw/JengaDockerStack",
        demo: "",
        icon: {
            isImage: false,
            iconName: "FaDocker",
            color: "#2496ED",
            size: 150,
        },
        techs: [
            { id: "6", name: "Docker", description: "Container platform", icon: { isImage: false } },
            { id: "7", name: "PostgreSQL", description: "Database", icon: { isImage: false } },
            { id: "8", name: "Redis", description: "Cache", icon: { isImage: false } },
            { id: "9", name: "GitLab", description: "DevOps platform", icon: { isImage: false } },
        ],
    },
    {
        id: "3",
        name: "Go Spider",
        description: "A web crawler application built in Go, designed to efficiently scrape and analyze data from websites, demonstrating concurrency, performance, and Go best practices.",
        repository: "https://github.com/Zmunshaw/Go-Spider", // fixed invalid URL
        demo: "",
        icon: {
            isImage: false,
            iconName: "FaGolang",
            color: "#00ADD8",
            size: 150,
        },
        techs: [
            { id: "10", name: "Go", description: "Programming language", icon: { isImage: false } },
            { id: "11", name: "Concurrency", description: "Async processing", icon: { isImage: false } },
        ],
    },
    {
        id: "4",
        name: "React Portfolio Site",
        description: "Another personal portfolio site designed to highlight skills and projects, with a focus on clean UI, modern frontend frameworks, and responsive design.",
        repository: "https://github.com/Zmunshaw/Developer-Portfolio-Site",
        demo: "",
        icon: {
            isImage: true,
            src: TSLogo,
        },
        techs: [
            { id: "12", name: "React", description: "UI library", icon: { isImage: false } },
            { id: "13", name: "TypeScript", description: "Type-safe JavaScript", icon: { isImage: false } },
            { id: "14", name: "CSS", description: "Styling", icon: { isImage: false } },
        ],
    },
];
