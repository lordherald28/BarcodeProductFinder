import { Mapper } from "../../bases/mappers";
import { IFilterFacetList } from "../../models/filter-facet.models";
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

  let paramsArray: string[] = [];

  if (params.metadata && params.metadata.pages) {
    // console.log(params)
    paramsArray.push(`page=${params.metadata.pages}`);
  }

  if (params.barcode) {
    paramsArray.push(`barcode=${params.barcode}`);
  }

  if (params.search) {
    paramsArray.push(`search=${params.search}`);
  }

  if (params.mpn) {
    paramsArray.push(`mpn=${params.mpn}`);
  }

  if (params.title) {
    paramsArray.push(`title=${params.title}`);
  }

  if (params.hasMetadata) {
    paramsArray.push(`metadata=${params.hasMetadata}`);
  }

  if (params.asin) {
    paramsArray.push(`asin=${params.asin}`);
  }

  if (params.brand) {
    paramsArray.push(`brand=${params.brand}`);
  }

  if (params.manufacture) {
    paramsArray.push(`manufacture=${params.manufacture}`);
  }

  if (params.category) {
    paramsArray.push(`category=${params.category}`);
  }

  if (params.key) {
    paramsArray.push(`key=${params.key}`);
  }

  url += paramsArray.join('&');

  return url;
}

// Cambio poruqe no se agregan
export class TransformProductModelToFacetList implements Mapper<ProductModel[], IFilterFacetList>{

  private categories = new Set<string>();
  private barcode = new Set<string>();
  private asin = new Set<string>();
  private brand = new Set<string>();
  private manufacture = new Set<string>();
  private mnp = new Set<string>();
  private nameProduct = new Set<string>();

  mapTo(param: ProductModel[]): IFilterFacetList {

    param.forEach(product => {
      let categoryParts = product.category.split(' > ');
      let category = '';
      for (let part of categoryParts) {
        if (category.length > 0) {
          category += ' > ';
        }
        category += part;
        this.categories.add(category);
      }

      // console.log(product.category)
      this.barcode.add(product.barcode_number);
      this.nameProduct.add(product.title);
      if (product.brand)
        this.brand.add(product.brand);
      if (product.manufacturer)
        this.manufacture.add(product.manufacturer);
      if (product.asin)
        this.asin.add(product.asin);
      if (product.mpn)
        this.mnp.add(product.mpn);
    });

    return {
      asinList: this.asin,
      brandList: this.brand,
      manufactureList: this.manufacture,
      mnpList: this.mnp,
      nameProductList: this.nameProduct,
      barcodeList: this.barcode,
      categories: this.categories
    }
  }

  resetFilters() {
    this.categories.clear();
    this.barcode.clear();
    this.asin.clear();
    this.brand.clear();
    this.manufacture.clear();
    this.mnp.clear();
    this.nameProduct.clear();
  }
}


// export class TransformProductModelToFacetList implements Mapper<ProductModel[], IFilterFacetList>{


//   mapTo(param: ProductModel[]): IFilterFacetList {
//     let filterFacetList: IFilterFacetList = Object.assign({})

//     let categories = new Set<string>();
//     let barcode = new Set<string>();
//     let asin = new Set<string>();
//     let brand = new Set<string>();
//     let manufacture = new Set<string>();
//     let mnp = new Set<string>();
//     let nameProduct = new Set<string>();

//     param.forEach(product => {
//       let categoryParts = product.category.split(' > ');
//       let category = '';
//       for (let part of categoryParts) {
//         if (category.length > 0) {
//           category += ' > ';
//         }
//         category += part;
//         categories.add(category);
//       }

//       console.log(product.category)
//       barcode.add(product.barcode_number);
//       nameProduct.add(product.title);
//       if (product.brand)
//         brand.add(product.brand);
//       if (product.manufacturer)
//         manufacture.add(product.manufacturer);
//       if (product.asin)
//         asin.add(product.asin);
//       if (product.mpn)
//         mnp.add(product.mpn);
//     });

//     filterFacetList = {
//       asinList: asin,
//       brandList: brand,
//       manufactureList: manufacture,
//       mnpList: mnp,
//       nameProductList: nameProduct,
//       barcodeList: barcode,
//       categories: categories
//     }

//     return filterFacetList
//   }

// }