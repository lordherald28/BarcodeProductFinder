import { Metadata } from "src/core/helpers/metadata-products";
import { Mapper, MapperResultProductEntity } from "../../bases/mappers";
import { ProductoEntity } from "../../entities/producto-entity";
import { isProductEntity } from "../../helpers/check-is-object";
import { ProductModel } from "../../models/product.model";


export class ProductMapper extends Mapper<ProductoEntity[], ProductModel[]> {

    mapTo(params: ProductoEntity[]): ProductModel[] {
        // // console.log(params)
        // if (!params || params.length === 0) {
        //     throw new Error('Parameter is blank');
        // }

        return params.map(product => {
            return {
                barcode_number: product.barcode_number,
                barcode_formats: product.barcode_formats,
                mpn: product.mpn,
                model: product.model,
                asin: product.asin,
                title: product.title,
                category: product.category,
                manufacturer: product.manufacturer,
                brand: product.brand,
                description: product.description,
                images: product.images
            }
        });
    }

}

/**
 * @param params: { products: ProductoEntity[]; metadata: Metadata; }
 * @returns @type{ products: ProductModel[]; metadata: Metadata; }
 */
export class ProductoMapperResponse extends MapperResultProductEntity<{ products: ProductoEntity[], metadata: Metadata }, { products: ProductModel[], metadata: Metadata }>{

    mapTo(params: { products: ProductoEntity[]; metadata: Metadata; }): { products: ProductModel[]; metadata: Metadata; } {
        // if (!params || params.products.length === 0) {
        //     throw new Error('Parameter is blank');
        // }
        const productsListTemp = params.products.map(product => {
            return {
                barcode_number: product.barcode_number,
                barcode_formats: product.barcode_formats,
                mpn: product.mpn,
                model: product.model,
                asin: product.asin,
                title: product.title,
                category: product.category,
                manufacturer: product.manufacturer,
                brand: product.brand,
                description: product.description,
                images: product.images
            }
        });

        // Crear objeto de retorno 
        const result = {
            products: productsListTemp,
            metadata: params.metadata
        }
        return result
    }

}