import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styles: [
    `
    .draggable {
      border: 1px solid #ccc;
      margin: 1rem;
      padding: 1rem;
      width: 6rem;
      cursor: move;
    }

    .drop-target {
      border: 1px dashed #ebebeb;
      margin: 1rem;
      padding: 1rem;
      width: 6rem;
    }
    `
  ]
  // styleUrls: ['./scatterplot.component.sass']
})
export class ScatterplotComponent implements OnInit {

  constructor() { }

 drawScatterplot(){// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
   // set the ranges
   var x = d3.scaleLinear().range([0, width]);
   var y = d3.scaleLinear().range([height, 0]);
  }

  ngOnInit() {
    this.drawScatterplot();
  }

}
