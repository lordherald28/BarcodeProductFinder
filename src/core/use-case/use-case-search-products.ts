import { IBaseUseCase } from "../bases/base-use-case.model";
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { Metadata } from "../helpers/metadata-products";

export class UseCaseSearchProducts implements IBaseUseCase<{
    params: {
        meta_data: Metadata;
        searchParameters: [{ [type: string]: { query: string } }]
    }
}, Observable<ProductModel[]>>{

    constructor(private readonly repositoryProducts: any){}
    execute(params: { params: { meta_data: Metadata; searchParameters: [{ [type: string]: { query: string; }; }]; }; }): Observable<Observable<ProductModel[]>> {
        throw new Error("Method not implemented.");
    }

}

