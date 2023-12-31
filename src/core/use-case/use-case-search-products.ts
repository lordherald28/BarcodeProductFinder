import { IBaseUseCase } from "../bases/base-use-case.model";
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { Metadata, SearchParams } from "../helpers/metadata-products";
import { ProductRepository } from "../repository/product-repository";

export class UseCaseSearchProducts implements IBaseUseCase<SearchParams, {products:ProductModel[],metadata:Metadata}>{

    constructor(private readonly repositoryProducts: ProductRepository) { }

    execute(params: SearchParams): Observable< {products:ProductModel[],metadata:Metadata}> {
        return this.repositoryProducts.searchProductByKeyword(params)

    }


}

