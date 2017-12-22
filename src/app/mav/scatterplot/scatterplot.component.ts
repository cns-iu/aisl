import { Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import * as d3 from 'd3';
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
  svgWidth:number = window.innerWidth; //initializing width for map container
  svgHeight:number = window.innerHeight;//initializing height for map container
  runData:any;
  data:any;
  constructor(element: ElementRef, private massager: AislMavDataMassagerService) {
    this.parentNativeElement = element.nativeElement; //to get native parent element of this component


  }

  drawScatterplot(data:Array<[number,number]>){


    let margin = {top: 20, right: 15, bottom: 60, left: 60}
    , width =  this.svgWidth - margin.left - margin.right
    , height = this.svgHeight - margin.top - margin.bottom;

    let x =  d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[0]; })])
    .range([ 0,  width]);

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

    // text label for the x axis
    main.append("text")
    .attr("transform",
    "translate(" + (width/2) + " ," +
    (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Run-Times");

    // draw the y axis
    let yAxis = d3.axisLeft(y);

    main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

    // text label for the y axis
    main.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Age");

    let g = main.append("svg:g");
    update(data, g);

  }
  update(data:Array<[number,number]>, g){
  g.selectAll("scatter-dots")
  .data(data)
  .enter().append("svg:circle")
  .attr("cx", function (d,i) { return x(d[0]); } )
  .attr("cy", function (d) { return y(d[1]); } )
  .attr("r", 8);

  g.selectAll("scatter-dots")
  .exit().remove();
}
fetchData(){
    this.massager.raceCompleted.subscribe(
      (msg) => {
        this.runData = msg.toArray();
        console.log(this.runData);



      }
    );
  }


  ngOnInit() {
   this.data = [[5,3], [10,2], [15,1], [2,4]];
   this.drawScatterplot(this.data);
   this.fetchData();

}
}
