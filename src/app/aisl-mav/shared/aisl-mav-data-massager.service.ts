import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AislMavDataMassagerService {

  raceCompleted: Observable<List<RaceCompletedMessage>>;

  constructor(private messageService: MessageService) {
    this.raceCompleted = <Observable<List<RaceCompletedMessage>>>messageService.asBoundedList(100, RaceCompletedMessage);

  }




}
