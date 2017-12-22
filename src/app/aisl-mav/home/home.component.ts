import { Component, OnInit } from '@angular/core';

import { Field } from '../../mav/shared/field';
import { AISL_FIELDS } from '../shared/aisl-fields';

@Component({
  selector: 'aisl-mav-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fields: Field[] = AISL_FIELDS;

  constructor() { }

  ngOnInit() {
  }

}
