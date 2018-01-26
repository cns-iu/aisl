import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import 'd3-transition'; // This adds transition support to d3-selection
import * as d3Array from 'd3-array';
import { scaleLinear, scaleOrdinal, scalePow, scaleTime, scalePoint } from 'd3-scale';

import { Changes, IField } from '../../dino-core';
import { ScatterplotDataService } from '../shared/scatterplot-data.service';
import { Point } from '../shared/point';

@Component({
  selector: 'dino-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ScatterplotDataService]
})
export class ScatterplotComponent implements OnInit, OnChanges {
  @Input() xField: IField<number | string>;
  @Input() yField: IField<number | string>;
  @Input() dataStream: Observable<Changes<any>>;

  @Input() margin = { top: 20, right: 15, bottom: 60, left: 60 };
  @Input() svgWidth: number = window.innerWidth - this.margin.left - this.margin.right - 300; // initializing width for map container
  @Input() svgHeight: number = window.innerHeight - this.margin.top - this.margin.bottom - 200; // initializing height for map container

  private streamSubscription: Subscription;
  private parentNativeElement: any; // a native Element to access this component's selector for drawing the map
  svgContainer: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, undefined>;
  containerMain: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, undefined>;
  mainG: d3Selection.Selection<SVGGElement, undefined, d3Selection.BaseType, any>;
  xAxisGroup: d3Selection.Selection<d3Selection.BaseType, any, d3Selection.BaseType, undefined>;
  yAxisGroup: d3Selection.Selection<d3Selection.BaseType, any, d3Selection.BaseType, undefined>;
  xScale: any; // d3Axis.AxisScale<any> couldn't figure out domain and range definition
  yScale: any; // d3Axis.AxisScale<any>
  xAxisLabel = 'x-axis'; // defaults
  yAxisLabel = 'y-axis'; // defaults
  xAxis: any; // d3Axis.Axis<any>;
  yAxis: any; // d3Axis.Axis<{}>;
  data: Point[] = [];

  constructor(element: ElementRef, public dataService: ScatterplotDataService) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnInit() {
    this.setScales([]);
    this.initVisualization();
    this.updateAxisLabels();

    this.dataService.points.subscribe((data) => {
      this.data = this.data.concat(data.add);
      this.setScales(this.data);
      this.drawPlots(this.data);
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'dataStream' && this.dataStream) {
        this.updateStreamProcessor();
      } else if (propName === 'xField' && this.xField) {
        this.updateStreamProcessor();
      } else if (propName === 'yField' && this.yField) {
        this.updateStreamProcessor();
      }
    }
  }

  updateStreamProcessor() {
    this.data = [];
    if (this.dataStream && this.xField && this.yField) {
      this.dataService.fetchData(this.dataStream, this.xField, this.yField);
    }
    this.updateAxisLabels();
  }

  updateAxisLabels() {
    if (this.xField) {
      d3Selection.select('#xAxisLabel').text(this.xField.label); // text label for the x axis
    }
    if (this.yField) {
      d3Selection.select('#yAxisLabel').text(this.yField.label); // text label for the x axis
    }
  }

  /****** This function draws the svg container, axes and their labels ******/
  initVisualization() {
    // initializing svg container
    this.svgContainer = d3Selection.select(this.parentNativeElement)
      .select('#plotContainer')
      .append('svg')
      .attr('width', this.svgWidth + this.margin.right + this.margin.left)
      .attr('height', this.svgHeight + this.margin.top + this.margin.bottom)
      .attr('class', 'chart');

    this.containerMain = this.svgContainer.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .attr('class', 'main');

    // text label for the x axis
    this.containerMain.append('text')
      .attr('transform',
      'translate(' + (this.svgWidth / 2) + ' ,' +
      (this.svgHeight + this.margin.top + 20) + ')')
      .attr('id', 'xAxisLabel')
      .style('text-anchor', 'middle')
      .text(this.xAxisLabel);

    // text label for the y axis
    this.containerMain.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - (this.svgHeight / 2))
      .attr('dy', '1em')
      .attr('id', 'yAxisLabel')
      .style('text-anchor', 'middle')
      .text(this.yAxisLabel);

    // draw the x axis
    this.xAxis = d3Axis.axisBottom(this.xScale);
    this.xAxisGroup = this.containerMain.append('g')
      .attr('transform', 'translate(0,' + this.svgHeight + ')')
      .attr('class', 'xAxis')
      .call(this.xAxis);

    // draw the y axis
    this.yAxis = d3Axis.axisLeft(this.yScale);
    this.yAxisGroup = this.containerMain.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'yAxis')
      .call(this.yAxis);

    this.mainG = this.containerMain.append('g');
  }

  /********* This function draws points on the scatterplot ********/
  drawPlots(data: Point[]) {
    const xscale = this.xScale;
    const yscale = this.yScale;

    const plots = this.mainG.selectAll('circle')
      .data(data);

    plots.transition().duration(500).attr('cx', (d) => xscale(d.x))
      .attr('cy', (d) => yscale(d.y));

    plots.enter().append('circle')
      .attr('cx', (d) => xscale(d.x))
      .attr('cy', (d) => yscale(d.y))
      .attr('r', 12)
      .attr('fill', 'red')
      .transition().duration(1000).attr('fill', 'black').attr('r', 8);

    this.xAxisGroup.transition().call(this.xAxis);  // Update X-Axis
    this.yAxisGroup.transition().call(this.yAxis);  // Update Y-Axis

    plots.exit().remove();
  }

  /**** This function sets scales on x and y axes based on fields selected *****/
  setScales(data: Point[]) {
    switch (this.xField.datatype) {
      default:
      case 'number':
        if (!this.xScale) {
          this.xScale = scaleLinear();
        }
        this.xScale.domain([0, d3Array.max(data, (d) => <number>d.x)])
          .range([0, this.svgWidth]);
        break;

      case 'string':
        if (!this.xScale) {
          this.xScale = scalePoint();
        }
        this.xScale.domain(data.map(el => el.x))
          .range([0, this.svgWidth]);
        break;
    }

    switch (this.yField.datatype) {
      default:
      case 'number':
        if (!this.yScale) {
          this.yScale = scaleLinear();
        }
        this.yScale.domain([0, d3Array.max(data, (d) => <number>d.y)])
          .range([this.svgHeight, 0]);
        break;

      case 'string':
        if (!this.yScale) {
          this.yScale = scalePoint();
        }
        this.yScale.domain(data.map(el => el.y))
          .range([this.svgHeight, 0]);
        break;
    }
  }
}
