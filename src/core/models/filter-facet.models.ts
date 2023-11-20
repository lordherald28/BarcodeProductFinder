

interface ICategoryFilterFacet {
    nameCategory: string;
}

interface IBarcodeFilterFacet {
    barcodeNumber: string;
}

interface ITitleFilterFacet {
    nameProduct: string;
}

export interface IFilterFacetList {
    categories: ICategoryFilterFacet[];
    barcodeList: IBarcodeFilterFacet[];
    titleList: ITitleFilterFacet[];
}