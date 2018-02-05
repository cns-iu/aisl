import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ScatterPlotDataService } from '../shared/scatterplot-data.service';
import { IField, Field, Changes } from '../../dino-core';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ScatterPlotDataService]
})
export class ScatterplotComponent implements OnInit {
  xFields: IField<any>[];
  yFields: IField<any>[];
  dataStream: Observable<Changes<any>>;

  xField: IField<any>;
  yField: IField<any>;
  constructor(public massager: ScatterPlotDataService) {
    this.xFields = massager.xFields;
    this.yFields = massager.yFields;
    this.xField = massager.xFields[0];
    this.yField = massager.yFields[1];
    this.dataStream = massager.dataStream;
  }

  ngOnInit() { }
}
