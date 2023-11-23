

export interface Metadata {
    pages: number;  //count pages
    products: number; // total products
    current_cursor?: string; // Current list products
    next_cursor?: string;    // Next list products
    cursor?: string;
    metadata?: string
}

export interface SearchParams {
    metadata: Metadata;
    search?: string;
    barcode?: string | string[];
    mpn?: string;
    title?: string;
    manufacture?: string;
    brand?: string;
    asin?: string;
    category?: string;
    hasMetadata?: string;
    cursor?: string;
    key?: string;
}