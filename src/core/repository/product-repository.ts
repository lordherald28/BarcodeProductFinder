import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";
import { Metadata } from "../helpers/metadata-products";

export abstract class ProductRepository {
    abstract searchProductByKeyword(
        params: {
            meta_data: Metadata;
            searchParameters: [{ [type: string]: { query: string } }];  // Desde la vista o desde el componente el usuario debe de conformar los parametros.
        }): Observable<ProductModel[]>
}
