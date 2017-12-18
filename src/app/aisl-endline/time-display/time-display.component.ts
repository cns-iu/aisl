import { Component, Input, OnInit, OnChange, SimpleChanges } from '@angular/core';

import {Duration, duration} from 'moment';
import {} from 'moment-duration-format';

@Component({
  selector: 'aisl-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.sass']
})
export class TimeDisplayComponent implements OnInit {
  @Input() timeFormat: string = 'mm:ss:SS';
  @Input() time: Duration = duration(0);

  formattedTime: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChange(changes: SimpleChanges) {
    this.formattedTime = this.time.format(this.timeFormat);
  }

}
