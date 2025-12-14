import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/shared/NavBar";
import {RightAreaIcons} from "./Types/NavBarTypes";
import {ProjectProvider} from "./context/ProjectContext";
import {fetchProjects} from "./services/projectService";

export const metadata: Metadata = {
	title: "Developer Portfolio - Zachary Munshaw",
	description: "Personal portfolio and development projects",
};

const links = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: 'Me', url: '/me' },
];

const icons: RightAreaIcons[] = [
    {
        link: "https://github.com/Zmunshaw",
        iconName: "FaGithub",
        canShow: true,
    },
    {
        link: "/account",
        iconName: "FaUserCircle",
        canShow: true,
    },
];

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const projects = await fetchProjects();

	return (
		<html lang="en">
			<body>
				<ProjectProvider projects={projects}>
					<NavBar title="Dev" links={links} rightArea={icons} />
					{children}
				</ProjectProvider>
			</body>
		</html>
	);
}
