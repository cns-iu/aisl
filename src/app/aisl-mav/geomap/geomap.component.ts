import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { List } from 'immutable';

import { IField, Changes } from '../../dino-core';

import { GeomapDataService } from '../shared/geomap-data.service';

@Component({
  selector: 'aisl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [GeomapDataService]
})
export class GeomapComponent implements OnInit {
  private stateDataStream: Observable<Changes>;

  stateField: IField<any>;
  stateColorField: IField<any>;

  stateFields: IField<any>[];
  stateColorFields: IField<any>[];

  constructor(public massager: GeomapDataService) {
    this.stateDataStream = massager.stateDataStream;

    this.stateField = massager.stateFields[0];
    this.stateColorField = massager.stateColorFields[1];

    this.stateFields = massager.stateFields;
    this.stateColorFields = massager.stateColorFields;

    this.pointDataStream = massager.pointDataStream;
  }

  ngOnInit() {
  }
}
