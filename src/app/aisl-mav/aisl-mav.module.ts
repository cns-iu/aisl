import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapComponent } from './geomap/geomap.component';
import {MavModule} from '../mav';

@NgModule({
  imports: [
    CommonModule,
    MavModule
  ],
  exports : [
    GeomapComponent
  ],
  declarations: [GeomapComponent]
})
export class AislMavModule { }
