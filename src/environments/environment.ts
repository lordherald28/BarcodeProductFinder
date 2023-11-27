// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`. 720hplwxqkubedc2cu6e0qq8ttwtsd

export const environment = {
  production: false,
  AuthenticationKey: {
    key: 'j6rswb72uiscjsgsy275b0zbhhz9g6',//barcodeuno7  //yv4hsi0dbzo0qxvp4tfs35khl2s9yo  Llave con datos
    keyv2: 'j6rswb72uiscjsgsy275b0zbhhz9g6' // Otra key con 50 consultas
  }
};

export const API_ProductBarcode = {
  searchKeyWord: 'https://api.barcodelookup.com/v3/products?',
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
