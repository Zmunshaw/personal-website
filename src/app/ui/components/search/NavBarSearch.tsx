"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../shared/shared.module.css';

const NavBarSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
        </form>
    );
};

export default NavBarSearch;
