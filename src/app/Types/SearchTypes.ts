export interface ApiSearchResponse {
    $id: string;
    foundResults: {
        $id: string;
        $values: SearchResultType[];
    };
}

export interface SearchResultType {
    $id: string;
    resultThumbnail: string;
    resultTitle: string;
    resultDescription: string;
    resultUrl: string;
    // Meta
    keywordMatch: boolean;
    resultScore: number;
    denseDistance: number;
    sparseDistance: number;

}

export interface SearchBarProps {
    onSearch: (query: string) => void;
}
