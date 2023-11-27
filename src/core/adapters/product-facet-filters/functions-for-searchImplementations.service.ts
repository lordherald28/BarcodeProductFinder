import { SearchParams } from "../../helpers/metadata-products";


export const contructionParams = (params: SearchParams, url: string) => {

  let paramsArray: string[] = [];

  if (params.metadata && params.metadata.pages) {

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