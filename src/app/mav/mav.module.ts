import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GeomapComponent } from './geomap/geomap.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DropTargetDirective } from './drop-target/drop-target.directive';
import { DragService } from './shared/drag.service';
import { AislMavDataMassagerService } from '../aisl-mav/shared/aisl-mav-data-massager.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    DragService,
    AislMavDataMassagerService ],
  exports: [
    GeomapComponent,
    ScatterplotComponent,
    AttributeSelectorComponent

  ],
  declarations: [GeomapComponent,
    ScatterplotComponent,
    AttributeSelectorComponent,
    DraggableDirective,
    DropTargetDirective
   ]
  })
  export class MavModule { }
