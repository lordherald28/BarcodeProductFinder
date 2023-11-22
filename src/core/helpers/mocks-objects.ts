import { ProductoEntity } from "../entities/producto-entity";
import { Availability, Condition, CurrencySymbol, SalePrice } from "../models/conditions-product";
import { IFilterFacetList } from "../models/filter-facet.models";
import { ProductModel } from "../models/product.model";
import { SearchParams } from "./metadata-products";

export const mocksProductsModel: ProductModel[] = [
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
        description: "One of a kind, Nike Red Running Shoes that are great for walking, running and sports.",
        images: [
            "https://images.barcodelookup.com/5219/52194594-1.jpg",
            "https://images.barcodelookup.com/5219/52194594-2.jpg",
            "https://images.barcodelookup.com/5219/52194594-3.jpg"
        ]
    }
]

export const mocksExpectedProductsModel: ProductModel[] = [
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
        description: "One of a kind, Nike Red Running Shoes that are great for walking, running and sports.",
        images: [
            "https://images.barcodelookup.com/5219/52194594-1.jpg",
            "https://images.barcodelookup.com/5219/52194594-2.jpg",
            "https://images.barcodelookup.com/5219/52194594-3.jpg"
        ]
    }
]

export const mocksProductsEntity: ProductoEntity[] = [
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
        "contributors": [
            {
                "role": "author",
                "name": "Blake, Quentin"
            },
            {
                "role": "publisher",
                "name": "Greenwillow Books"
            }
        ],
        age_group: "adult",
        ingredients: "Organic Tapioca Syrup, Organic Dried Cane Syrup, Natural Flavor.",
        nutrition_facts: "Protein 0 G, Total lipid (fat) 0 G, Energy 300 KCAL, Sugars, total including NLEA 40 G.",
        energy_efficiency_class: "A+ (A+++ to D)",
        color: "blue",
        gender: "female",
        material: "cloth",
        pattern: "checkered",
        format: "DVD",
        multipack: "8",
        size: "7 US",
        length: "45 in",
        width: "30 in",
        height: "22 in",
        weight: "7 lb",
        release_date: "2003-07-28",
        description: "One of a kind, Nike Red Running Shoes that are great for walking, running and sports.",
        features: [
            "Rugged construction",
            "Convenient carrying case",
            "5 year warranty"
        ],
        images: [
            "https://images.barcodelookup.com/5219/52194594-1.jpg",
            "https://images.barcodelookup.com/5219/52194594-2.jpg",
            "https://images.barcodelookup.com/5219/52194594-3.jpg"
        ],
        last_update: "2022-03-03 20:28:19",
        stores: [
            {
                name: "Newegg.com",
                country: "US",
                currency: "USD",
                currency_symbol: CurrencySymbol.L,
                price: "41.38",
                sale_price: SalePrice.The1600,
                tax: [
                    {
                        "country": "US",
                        "region": "US",
                        "rate": "5.00",
                        "tax_ship": "no"
                    }
                ],
                link: "https://www.newegg.com/product-link",
                item_group_id: "AB-4312",
                availability: Availability.InStock,
                condition: Condition.New,
                shipping: [
                    {
                        country: "US",
                        region: "US",
                        service: "Standard",
                        price: "8.49 USD"
                    }
                ],
                last_update: "2021-05-19 09:07:42"
            },],
        reviews: [
            {
                name: "Josh Keller",
                rating: "5",
                title: "Love these shoes!",
                review: "A stylish and great fitting shoe for walking and running.",
                date: "2015-03-19 21:48:03"
            },
        ]
    }
]

export const mockSearchParamsForsearchProductByKeyword: SearchParams = {
    meta_data: {
        pages: 1,
        products: 22,
        cursor: 'cursor=y',

    },
    search: 'chocolate'
}

export const mockSearchParamsForsearchsearcProductByFacetFilter: SearchParams = {
    meta_data: {
        pages: 1,
        products: 0,
        cursor: 'y',
        metadata: 'y' 
    },
    search:'',
    category: 'Media > Books > Print Books'
}

export const mockFacetFilter: IFilterFacetList = {
    categories: new Set(['Electronics', 'Books', 'Clothing']),
    barcodeList: new Set(['123456789', '987654321']),
    nameProductList: new Set(['Smartphone', 'Laptop']),
    brandList: new Set(['BrandA', 'BrandB']),
    manufactureList: new Set(['ManufacturerA', 'ManufacturerB']),
    mnpList: new Set(['MNP123', 'MNP456']),
    asinList: new Set(['ASIN123', 'ASIN456'])
  };
  