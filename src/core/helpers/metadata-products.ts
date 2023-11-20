

export interface Metadata {
    pages: number;  //count pages
    products: number; // total products
    current_cursor?: string; // Current list products
    next_cursor?: string;    // Next list products
    cursor?:string;
    metadata?:string
}

export interface SearchParams {
    meta_data:Metadata;
    search?:string;
    barcode?: string;
    mpn?: string;
    title?: string;
    metadata?: string;
    cursor?: string;
    key?: string;
}