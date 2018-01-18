import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { Field } from '../../mav/shared/field';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AislMavDataMassagerService {

  raceCompleted: Observable<List<RaceCompletedMessage>>;
  stream: Observable<any[]>;
  // stream: any[] = [];

  constructor(private messageService: MessageService) {
    this.raceCompleted = <Observable<List<RaceCompletedMessage>>>messageService.asBoundedList(100, RaceCompletedMessage);
  }

  setAtMassager(fieldTuple: [Field, Field]) {
    this.fetchData(fieldTuple);
  }

  fetchData(fieldTuple: [Field, Field]) {
    const xAttrName = fieldTuple[0].property;
    const yAttrName = fieldTuple[1].property;
    const xAttrType = fieldTuple[0].type;
    const yAttrType = fieldTuple[1].type;

    this.stream = this.raceCompleted.map((msg) => {
      const msgArray = msg.toArray();
      const data: any[] = [];
      msg.toArray().forEach((m) => {
        m.results.forEach((d) => {
          const obj = {
            'persona': d.persona,
            'avatar': msgArray[0].avatar
          };
          obj['persona'][yAttrType] = d[yAttrName] / 1000;
          obj['persona'][xAttrType] = Math.random() * 4;
          data.push(obj);
        });
      });
      return data;
    });
  }
}
