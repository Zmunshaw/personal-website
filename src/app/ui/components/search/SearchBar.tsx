// SearchBar.tsx
import React, { useState } from 'react';
import { SearchBarProps } from "../../../Types/SearchTypes";
import styles from './search.module.css';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        onSearch(value);

        if (value.trim() && !hasSearched) {
            setHasSearched(true);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setHasSearched(false);
        onSearch('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (searchQuery.trim()) {
                setHasSearched(true);
            }
        }
    };

    return (
        <div className={`${styles.container} ${hasSearched ? styles.searched : styles.centered}`}>
            <div className={styles.wrapper}>
                <svg
                    className={styles.icon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                />

                {searchQuery && (
                    <button
                        className={styles.clearButton}
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;