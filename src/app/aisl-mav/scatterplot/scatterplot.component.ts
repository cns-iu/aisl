import { Component, Input, OnInit } from '@angular/core';
import { AislMavDataMassagerService } from '../shared/aisl-mav-data-massager.service';
import { Field } from '../../mav/shared/field';
import { AISL_FIELDS } from '../shared/aisl-fields';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [AislMavDataMassagerService]
})

export class ScatterplotComponent implements OnInit {

  permittedXFields: Set<Field>;
  permittedYFields: Set<Field>;
  // fieldTuple: [Field, Field];
  // stream: Observable<any[]>;

  constructor(public massager: AislMavDataMassagerService) {
    // this.fieldTuple = [
    //   { 'label': 'Name', 'type': 'persona', 'property': 'name', 'datatype': 'string', 'kind': 'variable' },
    //   { 'label': 'Run Time', 'type': 'run', 'property': 'timeMillis', 'datatype': 'number', 'kind': 'variable' }
    // ];
    this.permittedXFields = new Set(AISL_FIELDS);
    this.permittedYFields = new Set(AISL_FIELDS);
    console.log(this.permittedXFields);
  }

  ngOnInit() { }
}
