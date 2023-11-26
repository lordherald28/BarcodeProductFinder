import { ChangeDetectorRef } from "@angular/core";


export abstract class IBaseComponets {

    constructor(public readonly changeDetectorRef: ChangeDetectorRef) {

    }
}