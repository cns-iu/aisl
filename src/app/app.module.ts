import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MavMockupModule} from './mav-mockup';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MavMockupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
