import { Availability, Condition, CurrencySymbol, SalePrice } from "./conditions-product";


export interface ProductModel {
    [key: string]: any; 

    barcode_number:          string;
    barcode_formats:         string;
    mpn:                     string;
    model:                   string;
    asin:                    string;
    title:                   string;
    category:                string;
    manufacturer:            string;
    brand:                   string;
    description:             string;
    images:                  string[];
   
}

export interface Contributor {
    role: string;
    name: string;
}

export interface Store {
    name:            string;
    country:         string;
    currency:        string;
    currency_symbol: CurrencySymbol;
    price:           string;
    sale_price:      SalePrice;
    tax:             any[];
    link:            string;
    item_group_id:   string;
    availability:    Availability;
    condition:       Condition;
    shipping:        any[];
    last_update:     string;
}
