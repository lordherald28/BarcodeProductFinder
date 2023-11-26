import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultImagePipe } from './pipes/url-img-not-found.pipe';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [DefaultImagePipe,FilterPipe],
  exports: [DefaultImagePipe,FilterPipe]
})
export class SharedModule { }
