import { Observable } from "rxjs";
import { IBaseUseCase } from "../bases/base-use-case.model";
import { SearchParams } from "../helpers/metadata-products";
import { ProductModel } from "../models/product.model";
import { ProductRepository } from "../repository/product-repository";


export class UseCasesearcProductByFacetFilter implements IBaseUseCase<SearchParams, ProductModel[]>{

    constructor(private readonly productRepository: ProductRepository) { }

    execute(params: SearchParams): Observable<ProductModel[]> {
        return this.productRepository.searcProductByFacetFilter(params);
    }
}