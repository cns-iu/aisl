import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { List } from 'immutable';

import { IField, Field, Changes } from '../../dino-core';

import { MessageService, RaceCompletedMessage } from '../../aisl-backend';

// Gender to color mapping
const genderToColorMap = {
  'male': 'blue',
  'female': 'pink',
  'other': 'purple'
};

// Common fields
const commonFields = [
  new Field<string>('color', 'Runner\'s Color', (item: any): string => {
    return item.persona.color;
  }),
  new Field<string>('gender', 'Runner\'s Gender', (item: any): string => {
    return item.persona.gender;
  }, (value: any): string => {
    return genderToColorMap[value] || genderToColorMap['other'];
  })
];

// Default fields
const defaultStateFields = [
  new Field<string>('state', 'State', (item: any): string => {
    return item.persona.state;
  })
];

const defaultStateColorFields = [
  new Field<string>('falseStart', 'False Start', (item: any): string => {
    return item.falseStart ? 'red' : 'green';
  }),
  new Field<string>('lane', 'Lane', (item: any): string => {
    switch (item.lane) {
      case 1:
        return 'crimson';

      case 2:
        return 'turquoise';

      default:
        return 'yellow';
    }
  })
];

const defaultPointPositionFields = [
  new Field<[number, number]>('position', 'Point Position', (item: any): [number, number] => {
    return [item.persona.latitude, item.persona.longitude];
  })
];

// Constants
const maxConcurrentResults = 2;

// Helper functions
function getStates(messages: RaceCompletedMessage[]): any {
  const results = messages.map((message) => message.results);
  return results.reduce((acc, current) => acc.concat(current), []);
}

function accumulateMessages(acc: List<RaceCompletedMessage>,
    current: RaceCompletedMessage): List<RaceCompletedMessage> {
  const maxSize = maxConcurrentResults + 1;
  const size = acc.size;

  return (size === maxSize ? acc.shift() : acc).push(current);
}

function messagesToChanges(messages: List<RaceCompletedMessage>): Changes {
  const maxSize = maxConcurrentResults + 1;
  const size = messages.size;

  if (size !== maxSize || size <= maxConcurrentResults) {
    return new Changes(getStates(messages.toJS()));
  } else {
    const added = [messages.last()];
    const removed = [messages.first()];

    return new Changes(getStates(added), getStates(removed));
  }
}

@Injectable()
export class GeomapDataService {
  readonly stateDataStream: Observable<Changes>;
  readonly stateFields: IField<string>[] = defaultStateFields;
  readonly stateColorFields: IField<string>[] = [].concat(
    commonFields, defaultStateColorFields
  );

  readonly pointDataStream: Observable<Changes>;
  readonly pointPositionFields: IField<[Number, Number]>[] = defaultPointPositionFields;

  readonly fields: IField<any>[] = [].concat(
    defaultStateFields, commonFields, defaultStateColorFields,
    defaultPointPositionFields
  );

  constructor(private messageService: MessageService) {
    this.stateDataStream = this.pointDataStream = messageService.asObservable().filter((message) => {
      return message instanceof RaceCompletedMessage;
    }).scan(accumulateMessages, List<RaceCompletedMessage>()).map(messagesToChanges);
  }
}
