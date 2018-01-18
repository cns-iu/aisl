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

import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import * as d3Array from 'd3-array';
import { scaleLinear, scaleOrdinal, scalePow, scaleTime } from 'd3-scale';
import { Transition } from 'd3-transition';
import { Field } from '../shared/field';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
})

export class ScatterplotComponent implements OnInit, OnChanges {
  @Input() margin = { top: 20, right: 15, bottom: 60, left: 60 };
  @Input() svgWidth: number = window.innerWidth - this.margin.left - this.margin.right - 300; // initializing width for map container
  @Input() svgHeight: number = window.innerHeight - this.margin.top - this.margin.bottom - 200; // initializing height for map container
  @Input() stream = [];
  @Input() xAttrType: string;
  @Input() yAttrType: string;
  @Output() xAttributeChanged = new EventEmitter<Field>();
  @Output() yAttributeChanged = new EventEmitter<Field>();
  private parentNativeElement: any; // a native Element to access this component's selector for drawing the map
  svgContainer: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, undefined>;
  containerMain: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, undefined>;
  mainG: d3Selection.Selection<SVGGElement, undefined, d3Selection.BaseType, any>;
  xAxisGroup: d3Selection.Selection<d3Selection.BaseType, any, d3Selection.BaseType, undefined>;
  yAxisGroup: d3Selection.Selection<d3Selection.BaseType, any, d3Selection.BaseType, undefined>;
  xScale: any; // d3Axis.AxisScale<any> couldn't figure out domain and range definition
  yScale: any; // d3Axis.AxisScale<any>
  xAttributeSelected: Field;
  yAttributeSelected: Field;
  xAxisLabel = 'x-axis'; // defaults
  yAxisLabel = 'y-axis'; // defaults
  xtype = 'number'; // defaults
  ytype = 'number'; // defaults
  xAxis: any; // d3Axis.Axis<any>;
  yAxis: any; // d3Axis.Axis<{}>;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement; // to get native parent element of this component
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['stream'].isFirstChange()) {
      for (const propName in changes) {
        if (propName === 'stream') {
          this.setScales();
          this.drawPlots();
        }
      }
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
  drawPlots() {
    const xscale = this.xScale;
    const yscale = this.yScale;
    const plots = this.mainG.selectAll('circle')
      .data(this.stream);

    this.xAxisGroup.transition().call(this.xAxis);  // Update X-Axis
    this.yAxisGroup.transition().call(this.yAxis);  // Update Y-Axis

    plots.enter().append('circle').attr('cx', (d) => {
      return xscale(d['persona'][this.xAttributeSelected['type']]);
    })
      .attr('cy', (d) => {
        return yscale(d['persona'][this.yAttributeSelected['type']]);
      })
      .attr('r', 10)
      .attr('fill', 'red')
      .transition().duration(5000).attr('fill', 'black').attr('r', 8);

    plots.exit().remove();
  }

  /**** This function sets scales on x and y axes based on fields selected *****/
  setScales() {
    switch (this.xtype) {
      default:
      case 'number':
        if (!this.xScale) {
          this.xScale = scaleLinear();
        }
        this.xScale.domain([0, d3Array.max(this.stream, (d) => {
          return d['persona'][this.xAttributeSelected['type']];
        })])
          .range([0, this.svgWidth]);
        break;

      case 'string': // blah;
        break;
    }

    switch (this.ytype) {
      default:
      case 'number':
        if (!this.yScale) {
          this.yScale = scaleLinear();
        }
        this.yScale.domain([0, d3Array.max(this.stream, (d) => {
          return d['persona'][this.yAttributeSelected['type']];
        })]).range([this.svgHeight, 0]);
        break;

      case 'string':  // blah
        break;
    }
  }

  xfieldDropped(fieldDropped) {
    this.xAttributeSelected = fieldDropped;
    d3Selection.select('#xAxisLabel').text(this.xAttributeSelected['label']); // text label for the x axis
    this.xAttributeChanged.next(this.xAttributeSelected);
  }

  yfieldDropped(fieldDropped) {
    this.yAttributeSelected = fieldDropped;
    d3Selection.select('#yAxisLabel').text(this.yAttributeSelected['label']); // text label for the y axis
    this.yAttributeChanged.next(this.yAttributeSelected);
  }

  ngOnInit() {
    this.setScales();
    this.initVisualization();
  }
}
