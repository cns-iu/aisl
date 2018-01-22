import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../mav/shared/field';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass']
})

export class ScatterplotComponent implements OnInit {

  @Input() xFields: Set<Field>;
  @Input() yFields: Set<Field>;
  @Input() rawstream: any;

  xAttributeSelected: Field = null;
  yAttributeSelected: Field = null;

  constructor() { }

  xfieldDropped(event) {
    if (this.checkValidity(event)) {
      this.xAttributeSelected = event;
    }
  }

  yfieldDropped(event) {
    if (this.checkValidity(event)) {
      this.yAttributeSelected = event;
    }
  }

  checkValidity(event) {
    return true;
  }

  ngOnInit() {
  }

}
