import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IField, Changes } from '../../dino-core';

@Component({
  selector: 'mav-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {
  @Input() stateFields: IField<any>[];
  @Input() stateColorFields: IField<any>[];
  @Input() stateDataStream: Observable<Changes<any>>;
  @Input() pointDataStream: Observable<Changes<any>>;
  @Input() stateField: IField<any>;
  @Input() stateColorField: IField<any>;

  constructor() { }

  ngOnInit() { }


}
