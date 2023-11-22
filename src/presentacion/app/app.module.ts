import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PROVIDERS_TOKENS, SYSTEM_CONFIG } from './../config/system.config';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
      useValue: SYSTEM_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
