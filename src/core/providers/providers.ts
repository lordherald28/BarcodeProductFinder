



import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductRepository } from '../repository/product-repository';
import { ProductsService } from '../services/production-services/products-implementation.service';
import { UseCaseSearchProducts } from '../use-case/use-case-search-products';
import { CustomHttpInterceptor } from './../adapters/interceptors/interceptor';
import { SearchProductsMocksService } from '../services/mocks-services/search-products-implementation-mocks.service';
import { InterceptorError } from '../adapters/interceptors/interceptor-error';
import { UseCaseGetFacetFilter } from '../use-case/use-case-get-facet-filter';
import { UseCasesearcProductByFacetFilter } from '../use-case/use-case-search-facet';
import { UseCaseGetMessages } from '../use-case/use-case-get-messages';
import { SystemRepository } from '../repository/system-repository';
import { UseCaseSetMessages } from '../use-case/use-case-set-messages';
import { SystemService } from '../services/system-services/system.service';
import { InjectionToken } from '@angular/core';


InjectionToken
const productFactoryUseCaseSearchProducts = (repo: ProductRepository) => new UseCaseSearchProducts(repo);
 const productFactoryUseCaseGetFacetFilters = (repo: ProductRepository) => new UseCaseGetFacetFilter(repo);
const productFactoryUseCaseSearchFacetFilters = (repo: ProductRepository) => new UseCasesearcProductByFacetFilter(repo);
const systemFactoryUseCaseGetMessages = (repo: SystemRepository) => new UseCaseGetMessages(repo);
const systemFactoryUseCaseSetMessages = (repo: SystemRepository) => new UseCaseSetMessages(repo);

const useCaseGetMessage = {
    provide: UseCaseGetMessages,
    useFactory: systemFactoryUseCaseGetMessages,
    deps: [SystemRepository]
}

const useCaseSetMessage = {
    provide: UseCaseSetMessages,
    useFactory: systemFactoryUseCaseSetMessages,
    deps: [SystemRepository]
}

const useCaseSearchProducts = {
    provide: UseCaseSearchProducts,
    useFactory: productFactoryUseCaseSearchProducts,
    deps: [ProductRepository]
}

const useCaseGetFacetFilter = {
    provide: UseCaseGetFacetFilter,
    useFactory: productFactoryUseCaseGetFacetFilters,
    deps: [ProductRepository]
}

const useCaseSearchFacetFilter = {
    provide: UseCasesearcProductByFacetFilter,
    useFactory: productFactoryUseCaseSearchFacetFilters,
    deps: [ProductRepository]
}

export const _providers = [
    { provide: ProductRepository, useClass: SearchProductsMocksService },
    { provide: SystemRepository, useClass: SystemService },
    useCaseSearchProducts,
    useCaseGetFacetFilter,
    useCaseSearchFacetFilter,
    useCaseGetMessage,
    useCaseSetMessage,
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