import { ProductoEntity } from "../entities/producto-entity";

export const isProductEntity=(obj: any): obj is ProductoEntity =>{
    return (
        obj &&
        typeof obj.barcode_number === 'string' &&
        typeof obj.barcode_formats === 'string'
    );
}
