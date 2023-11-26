

export interface ICategoryFilterFacet {
    nameCategory: string;
}

export interface IBarcodeFilterFacet {
    barcodeNumber: string;
}

export interface ITitleFilterFacet {
    nameProduct: string;
}

export type FilterFacetKey = keyof IFilterFacetList;

export interface IFilterFacetList {
    categories?: Set<string>;
    barcodeList?: Set<string>;
    nameProductList?: Set<string>;
    brandList?: Set<string>;
    manufactureList?: Set<string>;
    mnpList?: Set<string>;
    asinList?: Set<string>;
}

export interface IFilterFacetListV2 {
    key?: Set<string>;

}