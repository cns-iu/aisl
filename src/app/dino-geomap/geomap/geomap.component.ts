import { ElementRef, Component, Input, OnInit, OnDestroy } from '@angular/core';

import { vega, defaultLogLevel } from '../../vega';
import * as us10m from './us-10m.json';
import * as geomapSpec from './spec.json';

@Component({
  selector: 'dino-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit, OnDestroy {
  private nativeElement: any;
  private view: any = null;

  @Input()
  set logLevel(level: number) {
    if (this.view) {
      this.view.logLevel(level);
    }
  }

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
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
      .run();
  }

  finalizeView() {
    if (this.view) {
      this.view.finalize();
    }
  }
}
