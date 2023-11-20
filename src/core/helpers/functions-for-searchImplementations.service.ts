import { SearchParams } from "./metadata-products";

export const contructionParams = (params: SearchParams, url: string) => {
    if (params.barcode) {
        url += `barcode=${params.barcode}`;
    }

    if (params.search) {
        url += `search=${params.search}`;
    }

    if (params.mpn) {
        url += `&mpn=${params.mpn}`;
    }

    if (params.title) {
        url += `&title=${params.title}`;
    }

    if (params.meta_data.metadata) {
        url += `&metadata=${params.meta_data.metadata}`;
    }

    if (params.meta_data.cursor) {
        url += `&cursor=${params.meta_data.cursor}`;
    }

    if (params.key) {
        url += `&key=${params.key}`;
    }
    return url;
}