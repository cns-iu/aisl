import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AislEndlineModule } from './aisl-endline';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AislEndlineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
