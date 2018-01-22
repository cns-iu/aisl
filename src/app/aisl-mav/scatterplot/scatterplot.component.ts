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

  constructor(public massager: AislMavDataMassagerService) {
    this.permittedXFields = new Set(AISL_FIELDS);
    this.permittedYFields = new Set(AISL_FIELDS);
  }

  ngOnInit() { }
}
