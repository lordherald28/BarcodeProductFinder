import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PROVIDERS_TOKENS, SYSTEM_CONFIG } from './../config/system.config';
import { CoreModule } from 'src/core/core.module';
import { AlertMessageComponent } from 'src/shared/components/alert-message/alert-message.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AlertMessageComponent
  ],
  providers: [
    {
      provide:  PROVIDERS_TOKENS.CONFIG_SYSTEM,
      useValue: SYSTEM_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
