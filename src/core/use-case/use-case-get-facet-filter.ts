import { IBaseUseCase } from "../bases/base-use-case.model";
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { Metadata, SearchParams } from "../helpers/metadata-products";
import { ProductRepository } from "../repository/product-repository";
import { IFilterFacetList } from "../models/filter-facet.models";

export class UseCaseGetFacetFilter implements IBaseUseCase<string, IFilterFacetList>{

    constructor(private readonly repositoryProducts: ProductRepository) { }
    execute(): Observable<IFilterFacetList> {
       return this.repositoryProducts.getFacetListForSearch()
    }




}

