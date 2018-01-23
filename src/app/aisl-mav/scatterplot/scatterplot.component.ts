import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ScatterPlotDataService, scatterPlotFields } from '../shared/scatterplot-data.service';
import { IField, Field, Changes } from '../../dino-core';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ScatterPlotDataService]
})
export class ScatterplotComponent implements OnInit {
  xFields: IField<any>[] = scatterPlotFields;
  yFields: IField<any>[] = scatterPlotFields;
  dataStream: Observable<Changes<any>>;

  xField: IField<any> = scatterPlotFields[1];
  yField: IField<any> = scatterPlotFields[1];

  constructor(public massager: ScatterPlotDataService) {
    this.dataStream = massager.dataStream;
  }

  ngOnInit() { }
}
