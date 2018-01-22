import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { MessageService } from '../../aisl-backend/shared/message.service';
import { RaceCompletedMessage } from '../../aisl-backend/shared/aisl-messages';
import { Field } from './field';
import { Observable } from 'rxjs/Observable';
import { Changes } from '../../dino-core';

@Injectable()
export class DataMassagerService {

  raceCompleted: Observable<List<RaceCompletedMessage>>;
  stream: Observable<Changes>;
  xAttribute: Field = { 'label': 'Name', 'type': 'persona', 'property': 'name', 'datatype': 'string', 'kind': 'variable' };
  yAttribute: Field = { 'label': 'Run Time', 'type': 'run', 'property': 'timeMillis', 'datatype': 'number', 'kind': 'variable' };

  constructor(private messageService: MessageService) {
    this.raceCompleted = <Observable<List<RaceCompletedMessage>>>messageService
      .asBoundedList(100, RaceCompletedMessage);
  }

  setAtMassager(attribute: Field, axis: string) {
    if (axis === 'x') {
      this.xAttribute = attribute;
    } else if (axis === 'y') {
      this.yAttribute = attribute;
    }
    this.fetchData();
  }

  fetchData() {
    const xAttrName = this.xAttribute.property;
    const yAttrName = this.yAttribute.property;
    const xAttrType = this.xAttribute.type;
    const yAttrType = this.yAttribute.type;

    this.stream = this.raceCompleted.map((msg) => {
      const msgArray = msg.toArray();
      return new Changes(msg.reduce((result, message) => {
        message.results.forEach((d) => {
          const obj = {
            'persona': d.persona,
            'avatar': msgArray[0].avatar
          };
          obj['persona'][yAttrType] = d[yAttrName] / 1000;
          obj['persona'][xAttrType] = Math.random() * 4;
          result.push(obj);
        });
        return result;
      }, []));

    });
  }

}
