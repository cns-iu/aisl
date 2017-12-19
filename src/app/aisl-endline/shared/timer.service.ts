import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Duration, duration } from 'moment';

import { MessageService } from '../../aisl-backend';
import { Timer } from './timer';

@Injectable()
export class TimerService {

  constructor(private messageService: MessageService) { }

  getTimer(): Timer {
    return new Timer();
    //return this.messageService.asObservable().map(() => duration(0)); // TODO Placeholder
  }

}
