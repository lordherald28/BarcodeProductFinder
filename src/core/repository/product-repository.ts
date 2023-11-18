import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";
import { Metadata, SearchParams } from "../helpers/metadata-products";

export abstract class ProductRepository {
    abstract searchProductByKeyword(params: SearchParams): Observable<ProductModel[]>;
}
