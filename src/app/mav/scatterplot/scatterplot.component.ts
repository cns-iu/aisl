import { Component,
  ElementRef,
  OnChanges,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { Field } from '../shared/field';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],

})
export class ScatterplotComponent implements OnInit, OnChanges {
  /*class attributes declarations */
  private parentNativeElement: any; // a native Element to access this component's selector for drawing the map
  svgContainer = null;
  margin = {top: 20, right: 15, bottom: 60, left: 60}
  svgWidth: number = window.innerWidth - this.margin.left - this.margin.right - 300; //initializing width for map container
  svgHeight: number = window.innerHeight - this.margin.top - this.margin.bottom - 200;//initializing height for map container
  @Input() newData: [number];
  // data: [[number, number]];
  svgG: any;
  xScale: any;
  yScale: any;
  xAxisLabel: string = "Age";
  xAttributeSelected: Field;
  yAttributeSelected: Field;
  xtype: string = 'number';
  ytype: string = 'number';
  xAxisGroup: any = null;
  yAxisGroup: any = null;
  xAxis: any;
  yAxis: any;
  @Output() xAttributeChanged = new EventEmitter<Field>();
  @Output() yAttributeChanged = new EventEmitter<Field>();
  update: boolean = false;
  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; //to get native parent element of this component
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes["newData"].isFirstChange()){
      // console.log("changes", changes);
      for (let propName in changes) {
      if (propName === 'newData' ) {
        // console.log("new data array from mav = ", this.newData);
        this.setScales();
        this.drawPlots();

      }
    }
  }
}

/****** This function draws the svg container, axes and their labels ******/
initVisualization() {
  //initializing svg container
  this.svgContainer = d3.select(this.parentNativeElement).select("#plotContainer")
  .append("svg")
  .attr('width', this.svgWidth + this.margin.right + this.margin.left)
  .attr('height', this.svgHeight + this.margin.top + this.margin.bottom)
  .attr('class', 'chart')

  let main = this.svgContainer.append('g')
  .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
  .attr('width', this.svgWidth)
  .attr('height', this.svgHeight)
  .attr('class', 'main')

  // draw the x axis
  this.xAxis = d3.axisBottom(this.xScale);

  this.xAxisGroup = main.append('g')
  .attr('transform', 'translate(0,' + this.svgHeight + ')')
  .attr('class', 'xAxis')
  .call(this.xAxis);

  // text label for the x axis
  main.append("text")
  .attr("transform",
  "translate(" + (this.svgWidth/2) + " ," +
  (this.svgHeight + this.margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text(this.xAxisLabel);

  // draw the y axis
  this.yAxis = d3.axisLeft(this.yScale);

  this.yAxisGroup = main.append('g')
  .attr('transform', 'translate(0,0)')
  .attr('class', 'yAxis')
  .call(this.yAxis);

  // text label for the y axis
  main.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - this.margin.left)
  .attr("x",0 - (this.svgHeight / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Run-Times");

  this.svgG = main.append("g");

}

/********* This function draws points on the scatterplot ********/
drawPlots() {

  this.xAxisGroup.transition().call(this.xAxis);  // Update X-Axis
  this.yAxisGroup.transition().call(this.yAxis);  // Update Y-Axis

  let xscale = this.xScale;
  let yscale = this.yScale;

  let plots = this.svgG.selectAll("circle")
  .data(this.newData);

  plots.enter().append("circle")
  .attr("cx", function (d) { return xscale(d[0]); } )
  .attr("cy", function (d) { return yscale(d[1]); } )
  .attr("r", 10)
  .attr("fill", "red")
  .transition().duration(5000).attr("fill","black").attr("r", 8);

  plots.exit().remove();
}

/**** This function sets scales on x and y axes based on fields selected *****/
setScales() {
  switch (this.xtype) {
    default:
    case 'number' :
    if (!this.xScale) {
      this.xScale = d3.scaleLinear();
    }
    this.xScale.domain([0, d3.max(this.newData, function(d) { return d[0]; })])
    .range([ 0,  this.svgWidth]);
    break;

    case 'string' : //blah;
    break;
  }

  switch (this.ytype){
    default:
    case 'number' :
    if (!this.yScale) {
      this.yScale = d3.scaleLinear();
    }
    this.yScale.domain([0, d3.max(this.newData, function(d) { return d[1]; })])
    .range([ this.svgHeight, 0 ]);
    break;

    case 'string' :  //blah
    break;

  }
}

xfieldDropped(fieldDropped) {
  this.xAttributeSelected =  fieldDropped;
  console.log(fieldDropped);
  this.xAttributeChanged.next(this.xAttributeSelected);
}

yfieldDropped(fieldDropped) {
  this.yAttributeSelected =  fieldDropped;
  console.log(fieldDropped);
  this.yAttributeChanged.next(this.yAttributeSelected);
}

ngOnInit() {
  this.setScales();
  this.initVisualization();
  this.drawPlots();

}
}
