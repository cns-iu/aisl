import { ElementRef, Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IField, Changes } from '../../dino-core';
import { vega, defaultLogLevel } from '../../vega';
import { GeomapDataService } from '../shared/geomap.dataservice';
import * as us10m from './us-10m.json';
import * as geomapSpec from './spec.json';

@Component({
  selector: 'dino-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [GeomapDataService]
})
export class GeomapComponent implements OnInit, OnDestroy, OnChanges {
  private nativeElement: any;
  private view: any = null;

  @Input() stateDataStream: Observable<Changes>;
  @Input() stateField: IField<string>;
  @Input() stateColorField: IField<string>;

  @Input() pointDataStream: Observable<Changes>;
  @Input() pointLatitudeField: IField<number>;
  @Input() pointLongitudeField: IField<number>;

  constructor(element: ElementRef, private dataService: GeomapDataService) {
    this.nativeElement = element.nativeElement;
  }

  ngOnChanges(changes) {
  }

  ngOnInit() {
    this.renderView(geomapSpec);
  }

  ngOnDestroy() {
    this.finalizeView();
  }

  renderView(spec: any) {
    this.finalizeView(); // Remove any old view

    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize(this.nativeElement)
      .logLevel(defaultLogLevel)
      .hover()
      .insert('states', vega.read(us10m, {
        type: 'topojson',
        feature: 'states'
      }))
      // TODO add stateColor and points data
      .run();
  }

  finalizeView() {
    if (this.view) {
      this.view.finalize();
    }
  }
}
