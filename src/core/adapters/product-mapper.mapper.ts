import { Mapper } from "../bases/mappers";
import { ProductoEntity } from "../entities/producto-entity";
import { isProductEntity } from "../helpers/check-is-object";
import { ProductModel } from "../models/product.model";


export class ProductMapper extends Mapper<ProductoEntity[], ProductModel[]> {

    mapTo(params: ProductoEntity[]): ProductModel[] {

        if (!params || params.length === 0) {
            throw new Error('Parameter is blank');
        }

        return params.map(p => {
            return {
                barcode_number: p.barcode_number,
                barcode_formats: p.barcode_formats,
                mpn: p.mpn,
                model: p.model,
                asin: p.asin,
                title: p.title,
                category: p.category,
                manufacturer: p.manufacturer,
                brand: p.brand,
                description: p.description,
                images: p.images
            }
        });
    }

}