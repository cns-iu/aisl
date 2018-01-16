import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { AislBackendModule } from './aisl-backend';
import { AislEndlineModule } from './aisl-endline';
import { AislMavModule } from './aisl-mav';
import { MavMockupModule } from './mav-mockup';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AislBackendModule,
    AislEndlineModule,
    AislMavModule,
    MavMockupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
