import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultImagePipe } from './pipes/url-img-not-found.pipe';


@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [DefaultImagePipe],
  exports: [DefaultImagePipe]
})
export class SharedModule { }
