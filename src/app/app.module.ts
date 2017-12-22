import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { MaterialModule } from './mav-mockup/material.module';
import { AislBackendModule } from './aisl-backend';
import { AislEndlineModule } from './aisl-endline';
import { AislMavModule } from './aisl-mav';
import { AppComponent } from './app.component';
import { MavMockupModule } from './mav-mockup';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AislBackendModule,
    AislEndlineModule,
    AislMavModule,
    MavMockupModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
