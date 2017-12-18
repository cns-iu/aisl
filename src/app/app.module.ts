import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import {AislMavModule} from './aisl-mav';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AislMavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
