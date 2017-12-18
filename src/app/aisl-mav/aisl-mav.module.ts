import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapComponent } from './geomap/geomap.component';
import {MavModule} from '../mav';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    MavModule
  ],
  exports : [
    GeomapComponent,
    HomeComponent
  ],
  declarations: [GeomapComponent, HomeComponent]
})
export class AislMavModule { }
