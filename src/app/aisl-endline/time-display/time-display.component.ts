import { Component, OnInit, Input } from '@angular/core';

import {Duration} from 'moment';
import {} from 'moment-duration-format';

@Component({
  selector: 'aisl-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.sass']
})
export class TimeDisplayComponent implements OnInit {
  @Input() timeFormat: string = 'mm:ss:SS';
  @Input() time: Duration;

  formattedTime: string;

  constructor() { }

  ngOnInit() {
    this.formattedTime = this.time.format(this.timeFormat);
  }

}
