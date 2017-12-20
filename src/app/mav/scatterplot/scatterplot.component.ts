import { Component, ElementRef, OnInit } from '@angular/core';
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

  private parentNativeElement: any; // a native Element to access this component's selector for drawing the map
  svgContainer=null;
  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; //to get native parent element of this component

  }

  fieldDropped(field: string) {
    console.log(field);
  }

  drawScatterplot(){
    let data = [[5,3], [10,17], [15,4], [2,8]];

    let margin = {top: 20, right: 15, bottom: 60, left: 60}
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom;

    let x =  d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[0]; })])
    .range([ 0, width ]);

    let y =  d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[1]; })])
    .range([ height, 0 ]);

    //initializing svg container
    this.svgContainer = d3.select(this.parentNativeElement).select("#plotContainer")
    .append("svg")
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

    let main = this.svgContainer.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')

    // draw the x axis
    let xAxis = d3.axisBottom(x);

    main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

    // draw the y axis
    let yAxis = d3.axisLeft(y);

    main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

    let g = main.append("svg:g");

    g.selectAll("scatter-dots")
    .data(data)
    .enter().append("svg:circle")
    .attr("cx", function (d,i) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", 8);



  }

  ngOnInit() {
    this.drawScatterplot();
  }

}
