



import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductRepository } from '../repository/product-repository';
import { ProductsService } from '../services/products-implementation.service';
import { UseCaseSearchProducts } from '../use-case/use-case-search-products';
import { CustomHttpInterceptor } from './../adapters/interceptors/interceptor';
import { SearchProductsMocksService } from '../services/mocks-services/search-products-implementation-mocks.service';
import { InterceptorError } from '../adapters/interceptors/interceptor-error';


const productFactoryUseCaseSearchProducts = (repo: ProductRepository) => new UseCaseSearchProducts(repo);

export const useCaseSearchProducts = {
    provide: UseCaseSearchProducts,
    useFactory: productFactoryUseCaseSearchProducts,
    deps: [ProductRepository]
}


export const _providers = [
    { provide: ProductRepository, useClass: SearchProductsMocksService }, useCaseSearchProducts,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CustomHttpInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorError,
        multi: true
    }
];