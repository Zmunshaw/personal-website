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
    },
];
