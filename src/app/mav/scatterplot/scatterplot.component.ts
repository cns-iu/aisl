import { Component, OnInit, Input } from '@angular/core';
import { Field } from '../../mav/shared/field';
import { DataMassagerService } from '../shared/data-massager.service';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [DataMassagerService]
})

export class ScatterplotComponent implements OnInit {

  @Input() xFields: Set<Field>;
  @Input() yFields: Set<Field>;
  @Input() rawstream: any;

  xAttributeSelected: Field = null;
  yAttributeSelected: Field = null;

  constructor(public massager: DataMassagerService) { }

  xfieldDropped(event) {
    this.xAttributeSelected = event;
    if (this.checkValidity()) {
      this.massager.setAtMassager(this.xAttributeSelected, 'x');
    }
  }

  yfieldDropped(event) {
    this.yAttributeSelected = event;
    if (this.checkValidity()) {
      this.massager.setAtMassager(this.yAttributeSelected, 'y');
    }
  }

  checkValidity() {
    return true;
  }
  ngOnInit() {
  }

}
