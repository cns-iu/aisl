import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeomapComponent } from './geomap/geomap.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DropTargetDirective } from './drop-target/drop-target.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GeomapComponent,
    ScatterplotComponent,
    AttributeSelectorComponent
  ],
  declarations: [GeomapComponent, ScatterplotComponent, AttributeSelectorComponent, DraggableDirective, DropTargetDirective]
})
export class MavModule { }
