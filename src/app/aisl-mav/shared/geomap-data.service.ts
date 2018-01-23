import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { IField, Field, Changes } from '../../dino-core';
import { Observable } from 'rxjs/Observable';

const geomapFields: IField<any>[] = [
  new Field<string>('state', 'State', (item: any): string => {
    return item.persona.state;
  }),
  new Field<string>('color', 'State Coloring', (item: any): string => {
    return item.persona.color;
  })
];

@Injectable()
export class GeomapDataService {
  stateFields: IField<any>[];
  stateColorFields: IField<any>[];

  stateDataStream: Observable<Changes<any>>;
  pointDataStream: Observable<Changes<any>>;

  constructor(private messageService: MessageService) {
    this.stateFields = geomapFields;
    this.stateColorFields = geomapFields;
    this.stateDataStream = <Observable<Changes<any>>>messageService
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
    this.pointDataStream = <Observable<Changes<any>>>messageService
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
