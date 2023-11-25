import { InjectionToken } from "@angular/core";

export type config_system = {
    url_logo: string;
    filterState: {
        isMustClear: boolean;
        filterState: string;
    },
    defaultImageUrl:string;
}


export enum PROVIDERS_TOKENS {
    // CONFIG_SYSTEM = new InjectionToken<number>('CONFIG_SYSTEM')
    CONFIG_SYSTEM = 'CONFIG_SYSTEM'
}

export const SYSTEM_CONFIG: config_system = {
    url_logo: '../../../assets/barcode-lookup-logo.webp',
    filterState: { filterState: 'filterState', isMustClear: true },
    defaultImageUrl:'../../../assets/notProducto.webp'
}