import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";
import { Metadata, SearchParams } from "../helpers/metadata-products";
import { IFilterFacetList } from "../models/filter-facet.models";

export abstract class ProductRepository {
    abstract searchProductByKeyword(params: SearchParams): Observable<{products:ProductModel[], metadata:Metadata}>;
    abstract searcProductByFacetFilter(params: SearchParams): Observable<{products:ProductModel[], metadata:Metadata}>
    abstract getFacetListForSearch(): Observable<IFilterFacetList>;
}
