import { Component, Input, OnInit } from '@angular/core';
import { AislMavDataMassagerService } from '../shared/aisl-mav-data-massager.service';
import { Field } from '../../mav/shared/field';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [AislMavDataMassagerService]
})

export class ScatterplotComponent implements OnInit {

  fieldTuple: [Field, Field];
  // stream: Observable<any[]>;

  constructor(public massager: AislMavDataMassagerService) {
    this.fieldTuple = [
      { 'label': 'Name', 'type': 'persona', 'property': 'name', 'datatype': 'string', 'kind': 'variable' },
      { 'label': 'Run Time', 'type': 'run', 'property': 'timeMillis', 'datatype': 'number', 'kind': 'variable' }
    ];
  }
  setXAttribute(xAttr) {
    console.log(xAttr);
    this.fieldTuple[0] = xAttr;
    this.massager.setAtMassager(this.fieldTuple);
  }

  setYAttribute(yAttr) {
    console.log(yAttr);
    this.fieldTuple[1] = yAttr;
    this.massager.setAtMassager(this.fieldTuple);
  }

  ngOnInit() { }
}
