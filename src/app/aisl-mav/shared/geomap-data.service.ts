import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { IField, Field, Changes } from '../../dino-core';
import { Observable } from 'rxjs/Observable';

const gender2color = {
  'male': 'blue',
  'female': 'pink',
  'other': 'purple'
};
const fields: IField<any>[] = [
  new Field<string>('state', 'State', (item: any): string => {
    return item.persona.state;
  }),
  new Field<string>('color', 'Runner\'s Color', (item: any): string => {
    return item.persona.color;
  }),
  new Field<string>('gender', 'Runner\'s Gender', (item: any): string => {
    return item.persona.gender;
  }, (value: any): string => {
    return gender2color[value] || gender2color['other'];
  })
];

@Injectable()
export class GeomapDataService {
  stateFields: IField<any>[];
  stateColorFields: IField<any>[];
  fields = fields;
  stateDataStream: Observable<Changes<any>>;
  pointDataStream: Observable<Changes<any>>;

  constructor(private messageService: MessageService) {
    this.stateFields = fields.slice(0, 1);
    this.stateColorFields = fields.slice(1, 3);
    this.stateDataStream = <Observable<Changes<any>>>messageService
      .asBoundedList(5, RaceCompletedMessage).map((messages) => {
        return new Changes(messages.reduce((result, message) => {
          const raceMessage = <RaceCompletedMessage>message;
          raceMessage.results.forEach((race) => {
            race['avatar'] = raceMessage.avatar;
            result.push(race);
          });
          return result;
        }, []).slice(0, 5));
      });
    this.pointDataStream = <Observable<Changes<any>>>messageService
      .asBoundedList(5, RaceCompletedMessage).map((messages) => {
        return new Changes(messages.reduce((result, message) => {
          const raceMessage = <RaceCompletedMessage>message;
          raceMessage.results.forEach((race) => {
            race['avatar'] = raceMessage.avatar;
            result.push(race);
          });
          return result;
        }, []).slice(0, 5));
      });
  }
}
