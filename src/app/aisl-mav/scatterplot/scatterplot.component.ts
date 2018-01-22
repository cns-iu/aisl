import { Component, Input, OnInit } from '@angular/core';
import { AislMavDataProviderService } from '../shared/aisl-mav-data-provider.service';
import { Field } from '../../mav/shared/field';
import { AISL_FIELDS } from '../shared/aisl-fields';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [AislMavDataProviderService]
})

export class ScatterplotComponent implements OnInit {
  permittedXFields: Set<Field>;
  permittedYFields: Set<Field>;

  constructor(public massager: AislMavDataProviderService) {
    this.permittedXFields = new Set(AISL_FIELDS);
    this.permittedYFields = new Set(AISL_FIELDS);
  }

  ngOnInit() { }
}
