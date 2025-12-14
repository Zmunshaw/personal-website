import React from "react";
import Image from "next/image";
import {SearchResultType} from "../../../Types/SearchTypes";
import search from './search.module.css'

interface SearchResultProps {
    result: SearchResultType;
}

const SearchResult: React.FC<SearchResultProps> = ({ result } ) => {
    const fullUrl = result.resultUrl.startsWith('http://') || result.resultUrl.startsWith('https://')
        ? result.resultUrl
        : 'https://' + result.resultUrl;

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            onClick={handleLinkClick}
            className={search['search-result-button']}
            title={result.resultTitle}
        >
            {result.resultThumbnail && (
                <div className={search['result-thumbnail']}>
                    <Image
                        src={result.resultThumbnail}
                        alt={result.resultTitle}
                        width={120}
                        height={120}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                        unoptimized
                    />
                </div>
            )}

            <div className={search['result-content']}>
                <h3 className={search['result-title']}>
                    {result.resultTitle}
                </h3>

                <div className={search['result-url']}>
                    {result.resultUrl}
                </div>

                <p className={search['result-description']}>
                    {result.resultDescription}
                </p>

                {result.resultScore && (
                    <div className={search['result-score']}>
                        Weighted Distance: {result.resultScore.toFixed(2)} | Semantic(Dense) Vector
                        Distance: {result.denseDistance.toFixed(2)} | Keyword(Sparse) Vector
                        Distance: {result.sparseDistance.toFixed(2)}
                    </div>
                )}
            </div>
        </button>
    );
};

export default SearchResult;