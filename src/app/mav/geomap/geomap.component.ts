import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'mav-geomap',
  templateUrl: './geomap.component.html'
  // styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(d3);

  }

}
