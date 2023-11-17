//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { _providers } from './providers/providers';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [..._providers],
  declarations: [],
  exports: []
})
export class CoreModule { }
