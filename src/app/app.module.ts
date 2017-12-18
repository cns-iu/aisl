import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AislBackendModule } from './aisl-backend';
import { AislEndlineModule } from './aisl-endline';
import {AislMavModule} from './aisl-mav';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AislBackendModule,
    AislEndlineModule,
    AislMavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
