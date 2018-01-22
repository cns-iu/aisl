import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { Field } from '../../mav/shared/field';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AislMavDataProviderService {
  raceCompleted: Observable<List<RaceCompletedMessage>>;

  constructor(private messageService: MessageService) {
    this.raceCompleted = <Observable<List<RaceCompletedMessage>>>messageService.asBoundedList(5, RaceCompletedMessage);
  }

}
