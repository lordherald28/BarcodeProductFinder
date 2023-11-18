



import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductRepository } from '../repository/product-repository';
import { ProductsService } from '../services/products.service';
import { UseCaseSearchProducts } from '../use-case/use-case-search-products';
// import { InterceptorError } from './../adapters/interceptors/interceptor-error';


const productFactoryUseCaseSearchProducts = (repo: ProductRepository) => new UseCaseSearchProducts(repo);

export const useCaseSearchProducts = {
    provide: UseCaseSearchProducts,
    useFactory: productFactoryUseCaseSearchProducts,
    deps: [ProductRepository]
}


export const _providers = [
    { provide: ProductRepository, useClass: ProductsService }, useCaseSearchProducts,
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: InterceptorError,
    //     multi: true
    // }
];