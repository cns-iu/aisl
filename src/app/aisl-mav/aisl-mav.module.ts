import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { GeomapComponent } from './geomap/geomap.component';
import { MavModule } from '../mav';
import { HomeComponent } from './home/home.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MavModule
  ],
  exports : [
    GeomapComponent,
    HomeComponent
  ],
  declarations: [GeomapComponent, HomeComponent, ScatterplotComponent, AttributeSelectorComponent]
})
export class AislMavModule { }
