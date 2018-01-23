import { Component, OnInit } from '@angular/core';

import { IField } from '../../dino-core';
import { AISL_FIELDS } from '../shared/aisl-fields';

@Component({
  selector: 'aisl-mav-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fields: IField<any>[] = AISL_FIELDS;

  constructor() { }

  ngOnInit() {
  }

}
