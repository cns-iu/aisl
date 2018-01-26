import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { IField, Field, Changes } from '../../dino-core';
import { Observable } from 'rxjs/Observable';
import { aislScatterplotFields } from './aisl-fields';

@Injectable()
export class ScatterPlotDataService {
  xFields: IField<any>[];
  yFields: IField<any>[];
  dataStream: Observable<Changes<any>>;

  constructor(private messageService: MessageService) {
    this.xFields = aislScatterplotFields;
    this.yFields = aislScatterplotFields;
    this.dataStream = <Observable<Changes<any>>>messageService
      .asBoundedList(5, RaceCompletedMessage).map((messages) => {
        return new Changes(messages.reduce((result, message) => {
          const raceMessage = <RaceCompletedMessage>message;
          raceMessage.results.forEach((race) => {
            race['avatar'] = raceMessage.avatar;
            result.push(race);
          });
          return result;
        }, []));
      });
  }
}
