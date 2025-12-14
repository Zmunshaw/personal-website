'use client';

import React from 'react';
import Link from 'next/link';
import shared from './shared.module.css'
import {FaAngry, FaUserCircle, FaGithub} from "react-icons/fa";
import {RightAreaIcons} from "../../Types/NavBarTypes";
import { IconType } from "react-icons";
import NavBarSearch from "../components/search/NavBarSearch";

type LinkItem = {
    label: string;
    url: string;
};

type NavBarProps = {
    title: string;
    links: LinkItem[];
    rightArea: RightAreaIcons[];
};

const iconMap: Record<string, IconType> = {
    FaGithub,
    FaUserCircle,
};

const NavBar: React.FC<NavBarProps> = ({ title, links, rightArea }) => {
    return (
        <nav className={shared.navbar}>
            <Link href="/" className={shared.left}>
                <FaAngry size={32} />
                <h1>{title}</h1>
            </Link>

            <NavBarSearch />

            <div className={shared.center}>
                <ul className={shared.links}>
                    {links.map(({ label, url }) => (
                        <li key={url}>
                            <Link href={url}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={shared.right}>
                {rightArea.map((iconData, index) => {
                    const isExternal = iconData.link.startsWith('http');
                    const IconComponent = iconMap[iconData.iconName];
                    if (!IconComponent) return null;

                    return (
                        <Link
                            key={index}
                            href={iconData.link}
                            className={shared.iconButton}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                            <IconComponent size={24} />
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default NavBar;