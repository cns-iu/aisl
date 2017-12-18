import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AislMavModule} from './aisl-mav';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AislMavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
