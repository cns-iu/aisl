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
  svgContainer=null;
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
  update: boolean = false;
  xAxisGroup: any;
  yAxisGroup: any;
  xAxis: any;
  yAxis: any;
  @Output() xAttributeChanged = new EventEmitter<Field>();
  @Output() yAttributeChanged = new EventEmitter<Field>();


  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; //to get native parent element of this component
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("changes", changes);
    for (let propName in changes) {
      if (propName === 'newData' ) {
        this.update = true;
        console.log("new data array from mav = ", this.newData);
        for(let value of this.newData){
        console.log("value",value);
          // this.data.push([Math.random()*((15 - 1) + 1), value]);
        }
        this.setScales();
        this.drawAxes();
        this.drawPlots();
      }
    }
  }

  /****** This function draws the svg container, axes and their labels ******/
  drawAxes = () => {
    // if(this.update == false){
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


      this.svgG = main.append("svg:g");
    // }
    // if(this.update == true){
      this.xAxisGroup.transition().call(this.xAxis);  // Update X-Axis
      this.yAxisGroup.transition().call(this.yAxis);  // Update Y-Axis
    // }


  }

  /********* This function draws points on the scatterplot ********/
  drawPlots = () => {

    let xscale = this.xScale;
    let yscale = this.yScale;

    let plots = this.svgG.selectAll("scatter-dots")
    .data(this.newData);

    let div = d3.select("#plotContainer").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    //console.log(div);
   // console.log("new",plots);

    plots = plots.enter().append("svg:circle")
    .attr("cx", function (d) { return xscale(d[0]); } )
    .attr("cy", function (d) { return yscale(d[1]); } )
    .attr("r", 8)
    .on("mouseover", (d) => {
      div.transition()
      .duration(200)
      .style("opacity", .7);
      //console.log("pageX", d3.event.pageX);

      div.html(d[0] + ","+ d[1] )
      .style("left", (d[0]) + "px")
      .style("top", (d[1]) + "px")
      .style("background","black")
      .style("color","white");
      console.log(d);
    });

    if (this.update) {
      plots.attr("fill", (d) => (this.newData.indexOf(d) < this.newData.length - 2 ) ? 'black' : 'red');
      plots.transition()
      .duration(2000);

    }

    plots.exit().remove();

  }


  /**** This function sets scales on x and y axes based on fields selected *****/
  setScales = () => {

console.log("data array", this.newData);

    switch (this.xtype){

      case 'number' :
      this.xScale =  d3.scaleLinear()
      .domain([0, d3.max(this.newData, function(d) { return d[0]; })])
      .range([ 0,  this.svgWidth]);
      break;

      case 'string' : //blah;
      break;
    }

    switch (this.ytype){
      case 'number' :
      this.yScale =  d3.scaleLinear()
      .domain([0, d3.max(this.newData, function(d) { return d[1]; })])
      .range([ this.svgHeight, 0 ]);
      break;

      case 'string' :  //blah
      break;

    }


  }



  xfieldDropped = (fieldDropped) => {
    this.xAttributeSelected =  fieldDropped;
    console.log(fieldDropped);
    this.xAttributeChanged.next(this.xAttributeSelected);
  }

  yfieldDropped = (fieldDropped) => {
    this.yAttributeSelected =  fieldDropped;
    console.log(fieldDropped);
    this.yAttributeChanged.next(this.yAttributeSelected);
  }

  ngOnInit() {
    // this.setScales();
    // this.drawAxes();
    // this.drawPlots();

  }


}
