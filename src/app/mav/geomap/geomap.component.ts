import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Changes, IField } from '../../dino-core';

@Component({
  selector: 'mav-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {

  @Input() stateDataStream: Observable<Changes>;
  @Input() stateField: IField<string>;
  @Input() stateColorField: IField<string>;

  @Input() pointDataStream: Observable<Changes>;
  @Input() pointLatitudeField: IField<number>;
  @Input() pointLongitudeField: IField<number>;

  constructor() { }

  ngOnInit() { }

}
