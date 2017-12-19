import { Component, Input, OnInit } from '@angular/core';

import {Duration, duration} from 'moment';

@Component({
  selector: 'aisl-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.sass']
})
export class TimerDisplayComponent implements OnInit {
  @Input() timerFormat: string = 'ss:SS';

  currentTime: Duration = duration(0);

  constructor() { }

  ngOnInit() {
  }

}
