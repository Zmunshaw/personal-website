"use client";

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultContainer from './SearchResultContainer';
import { SearchResultType } from '../../../Types/SearchTypes';
import styles from './search.module.css';

interface ApiSearchResponse {
    foundResults: {
        $values: SearchResultType[];
    };
}

const Search: React.FC = () => {
    const [results, setResults] = useState<SearchResultType[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentQuery, setCurrentQuery] = useState<string>('');
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 200) {
            addMoreResults(currentQuery);
        }

        // Hide navbar when scrolling down
        const navbar = document.querySelector('nav') as HTMLElement;
        const searchContainer = document.querySelector('[class*="searched"]') as HTMLElement;
        if (navbar && hasSearched) {
            if (scrollTop > 70) {
                navbar.style.opacity = '0';
                navbar.style.visibility = 'hidden';
                if (searchContainer) {
                    searchContainer.style.top = '0';
                }
            } else {
                navbar.style.opacity = '1';
                navbar.style.visibility = 'visible';
                if (searchContainer) {
                    searchContainer.style.top = '70px';
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentQuery, hasSearched]);

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();

        if (lowerCaseQuery.trim()) {
            setHasSearched(true);
            setIsLoading(true);
            setError('');
            submitQuery(lowerCaseQuery);
        }
    };

    const submitQuery = async (query: string) => {
        setCurrentQuery(query);
        setResults([]);
        try {
            const response = await fetch(`https://api.zacharymunshaw.dev/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data: ApiSearchResponse = await response.json();
            console.log(data);

            setResults(data.foundResults.$values);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const addMoreResults = async (query: string) => {
        if (!query) return;

        try {
            const response = await fetch(`https://api.zacharymunshaw.dev/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data: ApiSearchResponse = await response.json();
            console.log(data);

            setResults(prev => [...prev, ...data.foundResults.$values]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    };

    return (
        <div className={hasSearched ? styles.searchContainerActive : ''}>
            <SearchBar onSearch={handleSearch} />

            {hasSearched && (
                <div className={styles.searchContainer}>
                    {isLoading && results.length === 0 && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p className={styles.loadingText}>Searching...</p>
                        </div>
                    )}

                    {error && (
                        <div className={styles.errorContainer}>
                            <p className={styles.error}>{error}</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <SearchResultContainer results={results} />
                    )}

                    {!isLoading && results.length === 0 && !error && (
                        <div className={styles.noResults}>
                            <p>No results found for "{currentQuery}"</p>
                        </div>
                    )}

                    {isLoading && results.length > 0 && (
                        <div className={styles.loadingMore}>
                            <div className={styles.spinnerSmall}></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;