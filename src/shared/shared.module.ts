import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlImgNotFoundPipe } from './pipes/url-img-not-found.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UrlImgNotFoundPipe],
  exports: [UrlImgNotFoundPipe]
})
export class SharedModule { }
