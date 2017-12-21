import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { GeomapComponent } from './geomap/geomap.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DropTargetDirective } from './drop-target/drop-target.directive';
import { DragService } from './drag.service';
import { FieldListComponent } from './field-list/field-list.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [ DragService ],
  exports: [
    GeomapComponent,
    ScatterplotComponent,
    AttributeSelectorComponent,
    FieldListComponent
  ],
  declarations: [GeomapComponent, ScatterplotComponent, AttributeSelectorComponent, DraggableDirective, DropTargetDirective, FieldListComponent]
})
export class MavModule { }
