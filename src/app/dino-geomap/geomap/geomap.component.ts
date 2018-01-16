import { Component, OnInit } from '@angular/core';

import { vega, defaultLogLevel } from '../../vega';
import * as us10m from './us-10m.json';

@Component({
  selector: 'dino-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
