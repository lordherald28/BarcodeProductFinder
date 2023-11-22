import { TransformProductModelToFacetList } from './functions-for-searchImplementations.service';
import { ProductModel } from './../../models/product.model';
import { mocksProductsModel } from 'src/core/helpers/mocks-objects';

describe('TransformProductModelToFacetList', () => {

    const _mocksProductsModelWithMissingProperties  = [
        {
            barcode_number: "886736874135",
            barcode_formats: "UPC-A 886736874135, EAN-13 0886736874135",
            mpn: "CE-XLR3200",
            model: "XLR",
            asin: "B01KUHG2G8",
            title: "Nike Red Running Shoes - Size 10",
            category: "Media > Books > Print Books",
            manufacturer: "Xerox",
            brand: "Xerox",
        }
    ]

    it('should map ProductModel array to IFilterFacetList correctly', () => {
        const mapper = new TransformProductModelToFacetList();
        const productModels: ProductModel[] = mocksProductsModel
        const result = mapper.mapTo(productModels);

        // Verify that the result contains the correct categories, barcodes, ASIN, brands, and manufacturers
        expect(result.categories.size).toBeGreaterThan(0);
        expect(result.barcodeList.size).toBeGreaterThan(0);
        expect(result.asinList.size).toBeGreaterThan(0);
        expect(result.brandList.size).toBeGreaterThan(0);
        expect(result.manufactureList.size).toBeGreaterThan(0);
    });

    it('should handle missing properties in ProductModel', () => {
        const mapper = new TransformProductModelToFacetList();
        const productModels: any[] = _mocksProductsModelWithMissingProperties ;
        const result = mapper.mapTo(productModels);
        expect(result).toBeTruthy()
    });
});
