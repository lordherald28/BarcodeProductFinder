import { Mapper } from "../../bases/mappers";
import { IFilterFacetList} from "../../models/filter-facet.models";
import { ProductModel } from "../../models/product.model";
import { SearchParams } from "../../helpers/metadata-products";


// export const contructionParams = (params: SearchParams, url: string) => {
    
//     if (params.search) {
//         url += `search=${params.search}`;
//     }
    
//     if (params.barcode) {
//         url += `barcode=${params.barcode}`;
//     }

//     if (params.mpn) {
//         url += `&mpn=${params.mpn}`;
//     }

//     if (params.title) {
//         url += `&title=${params.title}`;
//     }

//     if (params.category) {
//         url += `&category=${params.category}`;
//     }

//     if (params.manufacture) {
//         url += `&manufacture=${params.manufacture}`;
//     }

//     if (params.asin) {
//         url += `&asin=${params.asin}`;
//     }

//     if (params.brand) {
//         url += `&brand=${params.brand}`;
//     }

//     if (params.meta_data.metadata) {
//         url += `&metadata=${params.meta_data.metadata}`;
//     }

//     if (params.meta_data.cursor) {
//         url += `&cursor=${params.meta_data.cursor}`;
//     }

//     if (params.key) {
//         url += `&key=${params.key}`;
//     }
//     return url;
// }

export const contructionParams = (params: SearchParams, url: string) => {
    
    if (params.search) {
        url += `search=${params.search}`;
    }
    
    if (params.barcode) {
        url += `barcode=${params.barcode}`;
    }

    if (params.mpn) {
        url += `&mpn=${params.mpn}`;
    }

    if (params.title) {
        url += `&title=${params.title}`;
    }

    if (params.category) {
        url += `&category=${params.category}`;
    }

    if (params.manufacture) {
        url += `&manufacture=${params.manufacture}`;
    }

    if (params.asin) {
        url += `&asin=${params.asin}`;
    }

    if (params.brand) {
        url += `&brand=${params.brand}`;
    }

    if (params.meta_data && params.meta_data.metadata) {
        url += `&metadata=${params.meta_data.metadata}`;
    }

    if (params.meta_data && params.meta_data.cursor) {
        url += `&cursor=${params.meta_data.cursor}`;
    }

    if (params.key) {
        url += `&key=${params.key}`;
    }
    return url;
}

export class TransformProductModelToFacetList implements Mapper<ProductModel[],IFilterFacetList>{
    mapTo(param: ProductModel[]): IFilterFacetList {
        let filterFacetList: IFilterFacetList = Object.assign({})

        let categories = new Set<string>();
        let barcode = new Set<string>();
        let asin = new Set<string>();
        let brand = new Set<string>();
        let manufacture = new Set<string>();
        let mnp = new Set<string>();
        let nameProduct = new Set<string>();
    
        param.forEach(product => {
            let categoryParts = product.category.split(' > ');
            let category = '';
            for (let part of categoryParts) {
                if (category.length > 0) {
                    category += ' > ';
                }
                category += part;
                categories.add(category);
            }
            barcode.add(product.barcode_number);
            nameProduct.add(product.title);
            if(product.brand)
            brand.add(product.brand);
        if(product.manufacturer)
            manufacture.add(product.manufacturer);
        if(product.asin)
            asin.add(product.asin);
        if(product.mpn)
            mnp.add(product.mpn);
        });
    
        filterFacetList = {
            asinList:asin,
            brandList:brand,
            manufactureList:manufacture,
            mnpList:mnp,
            nameProductList:nameProduct,
            barcodeList: barcode,
            categories: categories
        }

        return filterFacetList
    }

}