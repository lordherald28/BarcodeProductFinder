import { Availability, Condition, CurrencySymbol, SalePrice } from "../models/conditions-product";


export interface IStore {
    name: string;
    country: string;
    currency: string;
    currency_symbol: CurrencySymbol;
    price: string;
    sale_price: SalePrice;
    tax: any[];
    link: string;
    item_group_id: string;
    availability: Availability;
    condition: Condition;
    shipping: any[];
    last_update: string;
}
