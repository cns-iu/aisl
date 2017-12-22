import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GeomapComponent } from './geomap/geomap.component';
import { MavModule } from '../mav';
import { HomeComponent } from './home/home.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
// import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';
import { FieldListComponent } from './field-list/field-list.component';
// import { DraggableDirective } from '../mav/draggable/draggable.directive';
// import { DropTargetDirective } from '../mav/drop-target/drop-target.directive';
// import { DragService } from '../mav/shared/drag.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MavModule
  ],
  providers: [
    // DragService
  ],
  exports : [
    GeomapComponent,
    HomeComponent
  ],
  declarations: [
    GeomapComponent,
    HomeComponent,
    ScatterplotComponent,
    // AttributeSelectorComponent,
    FieldListComponent
    // DraggableDirective,
    // DropTargetDirective
  ]
  })
  export class AislMavModule { }
