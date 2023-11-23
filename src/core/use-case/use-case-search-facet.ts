import { Observable } from "rxjs";
import { IBaseUseCase } from "../bases/base-use-case.model";
import { Metadata, SearchParams } from "../helpers/metadata-products";
import { ProductModel } from "../models/product.model";
import { ProductRepository } from "../repository/product-repository";


export class UseCasesearcProductByFacetFilter implements IBaseUseCase<SearchParams, { products: ProductModel[], metadata: Metadata }>{

    constructor(private readonly productRepository: ProductRepository) { }

    execute(params: SearchParams): Observable<{ products: ProductModel[], metadata: Metadata }> {
        return this.productRepository.searcProductByFacetFilter(params);
    }
}