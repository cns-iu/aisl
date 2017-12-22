import { Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';

import { AislMavDataMassagerService }  from '../../aisl-mav/shared/aisl-mav-data-massager.service';


@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [AislMavDataMassagerService]
})


export class ScatterplotComponent implements OnInit {
  /*class attributes declarations */
  private parentNativeElement: any; // a native Element to access this component's selector for drawing the map
  svgContainer=null;
  margin = {top: 20, right: 15, bottom: 60, left: 60}
  svgWidth: number = window.innerWidth - this.margin.left - this.margin.right - 300; //initializing width for map container
  svgHeight: number = window.innerHeight - this.margin.top - this.margin.bottom - 200;//initializing height for map container
  data: any;
  svgG: any;
  xScale: any;
  yScale: any;
  xAxisLabel: string = "Age";

  constructor(element: ElementRef, public massager: AislMavDataMassagerService) {
    this.parentNativeElement = element.nativeElement; //to get native parent element of this component
  }

/****** This function draws the svg container, axes and their labels ******/
  drawAxes(){

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
    let xAxis = d3.axisBottom(this.xScale);

    main.append('g')
    .attr('transform', 'translate(0,' + this.svgHeight + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

    // text label for the x axis
    main.append("text")
    .attr("transform",
    "translate(" + (this.svgWidth/2) + " ," +
    (this.svgHeight + this.margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text(this.xAxisLabel);

    // draw the y axis
    let yAxis = d3.axisLeft(this.yScale);

    main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

    // text label for the y axis
    main.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - this.margin.left)
    .attr("x",0 - (this.svgHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Run-Times");

    this.svgG = main.append("svg:g");

    this.drawPlots(false);
  }

/********* This function draws points on the scatterplot ********/
  drawPlots(update:boolean = true){

    let xscale = this.xScale;
    let yscale = this.yScale;

    let plots = this.svgG.selectAll("scatter-dots")
    .data(this.data);

    // console.log("new",plots);
    // plots.transition()
    //         .duration(2000);

    plots = plots.enter().append("svg:circle")
      .attr("cx", function (d) { return xscale(d[0]); } )
      .attr("cy", function (d) { return yscale(d[1]); } )
      .attr("r", 8);

    if (update) {
        plots.attr("fill", (d) => (this.data.indexOf(d) !== this.data.length - 1) ? 'black' : 'red');
    }

    plots.exit().remove();

  }

/*** This function gets data from massager service based on fields selected ***/
  fetchData(){
    let refToData = this.data;

    this.massager.raceCompleted.subscribe(
      (msg) => {
        let runData = msg.toArray();
        runData[0].results.forEach(function(d){
          refToData.push([Math.random()*((15 - 1) + 1), d.timeMillis/1000]);

        })


        this.drawPlots();

      }
    );
  }

/**** This function sets scales on x and y axes based on fields selected *****/
  setScales(data:Array<[number,number]>){
    this.xScale =  d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[0]; })])
    .range([ 0,  this.svgWidth]);

    this.yScale =  d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[1]; })])
    .range([ this.svgHeight, 0 ]);
  }


  ngOnInit() {
    this.data = [[5,3], [10,2], [15,1], [2,4]];
    this.setScales(this.data)
    this.drawAxes();
    this.fetchData();
    // this.massager.attribute.subscribe(
    //   (msg) => {
    //     console.log(msg);
    //
    // });

  }

}
