import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { IField, Field, Changes } from '../../dino-core';
import { Observable } from 'rxjs/Observable';

export const scatterPlotFields: IField<any>[] = [
  new Field<string>('name', 'Name', (item: any): string => {
    return item.persona.name;
  }),
  new Field<number>('timeMillis', 'Run Time', (item: any): number => {
    return item.timeMillis;
  }, (value: number) => value / 1000.0)
];

@Injectable()
export class ScatterPlotDataService {
  dataStream: Observable<Changes<any>>;

  constructor(private messageService: MessageService) {
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
