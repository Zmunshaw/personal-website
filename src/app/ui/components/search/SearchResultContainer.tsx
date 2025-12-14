// SearchResults.tsx
import React from 'react';
import {SearchResultType} from '../../../Types/SearchTypes';
import SearchResult from "./SearchResult";
import search from './search.module.css'

export interface SearchResultsProps {
    results: SearchResultType[];
}

const SearchResultContainer: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className={search.searchContainer}>
            <ul className={search.ul}>
            {results.map(result => (
                <li className={search.li} key={result.$id}>
                   <SearchResult result={result} />
                </li>
            ))}
            </ul>
        </div>
    );
};

export default SearchResultContainer;