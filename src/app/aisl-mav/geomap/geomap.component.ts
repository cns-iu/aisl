import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GeomapDataService } from '../shared/geomap-data.service';
import { IField, Field, Changes } from '../../dino-core';

@Component({
  selector: 'aisl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [GeomapDataService]
})
export class GeomapComponent implements OnInit {
  stateFields: IField<any>[];
  stateColorFields: IField<any>[];
  stateDataStream: Observable<Changes<any>>;
  pointDataStream: Observable<Changes<any>>;
  stateField: IField<any>;
  stateColorField: IField<any>;

  constructor(public massager: GeomapDataService) {
    this.stateFields = massager.stateFields;
    this.stateColorFields = massager.stateColorFields;
    this.stateField = massager.stateFields[0];
    this.stateColorField = massager.stateColorFields[1];

    this.stateDataStream = massager.stateDataStream;
    this.pointDataStream = massager.pointDataStream;
  }

  ngOnInit() { }

}
