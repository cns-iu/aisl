import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTabsModule, MatSidenavModule } from '@angular/material';

import { DinoGeomapModule } from '../dino-geomap';
import { DinoScatterplotModule } from '../dino-scatterplot';

import { GeomapComponent } from './geomap/geomap.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { AttributeSelectorComponent } from './attribute-selector/attribute-selector.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DropTargetDirective } from './drop-target/drop-target.directive';
import { DragService } from './shared/drag.service';

const components: any[] = [
  GeomapComponent,
  ScatterplotComponent,
  AttributeSelectorComponent,
  DraggableDirective,
  DropTargetDirective
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    DinoGeomapModule,
    DinoScatterplotModule
  ],
  exports: components,
  providers: [
    DragService
  ],
  declarations: components
})
export class MavModule { }
