import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IField } from '../../dino-core';
import { aislScatterplotFields, aislGeomapFields } from '../shared/aisl-fields';

@Component({
  selector: 'aisl-mav-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  @Input() fields = aislScatterplotFields;

  constructor() { }

  ngOnInit() { }

  setFields(index: number) {
    if (index === 0) {
      this.fields = aislScatterplotFields;
    } else if (index === 1) {
      this.fields = aislGeomapFields;
    }
  }
}
