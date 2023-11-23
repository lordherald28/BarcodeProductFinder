import { Mapper } from '../../bases/mappers';
import { isProductEntity } from '../../helpers/check-is-object';
import { mockProductsModelResponse, mocksProductsEntity, mocksProductsModel } from '../../helpers/mocks-objects';
import { ProductoEntity } from '../../entities/producto-entity';
import { ProductModel } from '../../models/product.model';
import { ProductMapper, ProductoMapperResponse } from './product-mapper.mapper';
import { Metadata } from 'src/core/helpers/metadata-products';

describe('ProductMapper', () => {
    let productMapper: ProductMapper;


    beforeEach(() => {
        productMapper = new ProductMapper();
    });

    it('should be an instance of Mapper', () => {
        expect(productMapper).toBeInstanceOf(Mapper)
    });

    it('should map each property in ProductEntity to ProductModel', () => {
        const params: ProductoEntity[] = mocksProductsEntity

        expect(params).toBeInstanceOf(Array<ProductoEntity>);

        expect(() => productMapper.mapTo([])).toThrow(new Error('Parameter is blank'));

        const result = productMapper.mapTo(params);

        expect(result).toEqual(mocksProductsModel);
        expect(result[0].barcode_number).toEqual(mocksProductsModel[0].barcode_number);
        expect(result[0].barcode_formats).toEqual(mocksProductsModel[0].barcode_formats);
        expect(result[0].asin).toEqual(mocksProductsModel[0].asin);
        expect(result[0].brand).toEqual(mocksProductsModel[0].brand);
        expect(result[0].category).toEqual(mocksProductsModel[0].category);
        expect(result[0].description).toEqual(mocksProductsModel[0].description);
        expect(result[0].images).toEqual(mocksProductsModel[0].images);
        expect(result[0].manufacturer).toEqual(mocksProductsModel[0].manufacturer);
        expect(result[0].model).toEqual(mocksProductsModel[0].model);
        expect(result[0].mpn).toEqual(mocksProductsModel[0].mpn);
        expect(result[0].title).toEqual(mocksProductsModel[0].title);

    });

    describe('ProductoMapperResponse', () => {
        let productoMapperResponse: ProductoMapperResponse;

        beforeEach(() => {
            productoMapperResponse = new ProductoMapperResponse();
        });

        it('should map each property in {ProductEntity[],Metadata} to {products:ProductModel[],metadata:Metadada}', () => {

            // const params: ProductoEntity[] = mocksProductsEntity;
            const mocksExpectedProductsModel: {products:ProductModel[],metadata:Metadata} = {
                products: mocksProductsModel,
                metadata: {
                    pages: 129652,
                    products: 1296514,
                    current_cursor: "y",
                    next_cursor: "AoEpMTAwMDA4NTk1"
                }
            }
                

            
            const params: { params: { productsEntityList: ProductoEntity[]; metadata: Metadata; } } = {
                params: {
                    productsEntityList: mocksProductsEntity,
                    metadata: {
                        pages: 129652,
                        products: 1296514,
                        current_cursor: "y",
                        next_cursor: "AoEpMTAwMDA4NTk1"
                    }
                }
            }

            expect(params.params.productsEntityList).toBeInstanceOf(Array<ProductoEntity>);
            expect(() => productoMapperResponse.mapTo({ products: [], metadata: { pages: 0, products: 0 } })).toThrow(new Error('Parameter is blank'));
            const result = productoMapperResponse.mapTo({ products: params.params.productsEntityList, metadata: params.params.metadata });


            expect(result).toEqual(mocksExpectedProductsModel);
            expect(result.products[0].barcode_number).toEqual(mocksProductsModel[0].barcode_number);
            expect(result.products[0].barcode_formats).toEqual(mocksProductsModel[0].barcode_formats);
            expect(result.products[0].asin).toEqual(mocksProductsModel[0].asin);
            expect(result.products[0].brand).toEqual(mocksProductsModel[0].brand);
            expect(result.products[0].category).toEqual(mocksProductsModel[0].category);
            expect(result.products[0].description).toEqual(mocksProductsModel[0].description);
            expect(result.products[0].images).toEqual(mocksProductsModel[0].images);
            expect(result.products[0].manufacturer).toEqual(mocksProductsModel[0].manufacturer);
            expect(result.products[0].model).toEqual(mocksProductsModel[0].model);
            expect(result.products[0].mpn).toEqual(mocksProductsModel[0].mpn);
            expect(result.products[0].title).toEqual(mocksProductsModel[0].title);

        });

    });

});
