import { Mapper } from '../bases/mappers';
import { isProductEntity } from '../helpers/check-is-object';
import { mocksProductsEntity, mocksProductsModel } from '../helpers/mocks-objects';
import { ProductoEntity } from './../entities/producto-entity';
import { ProductModel } from './../models/product.model';
import { ProductMapper } from './product-mapper.mapper';

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



});
