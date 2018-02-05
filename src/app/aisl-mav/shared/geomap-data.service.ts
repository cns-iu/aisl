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

// Default fields
const defaultStateFields = [
  new Field<string>('state', 'State', (item: any): string => {
    return item.persona.state;
  })
];

const defaultStateColorFields = [
  new Field<string>('color', 'Runner\'s Color', (item: any): string => {
    return item.persona.color;
  }),
  new Field<string>('gender', 'Runner\'s Gender', (item: any): string => {
    return item.persona.gender;
  }, (value: any): string => {
    return genderToColorMap[value] || genderToColorMap['other'];
  })
];

// Constants
const maxConcurrentResults = 1;

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
  stateFields: IField<any>[] = defaultStateFields;
  stateColorFields: IField<any>[] = defaultStateColorFields;

  readonly pointDataStream: Observable<Changes>;

  fields: IField<any>[];

  constructor(private messageService: MessageService) {
    this.fields = [].concat(
      this.stateFields, this.stateColorFields
    );

    this.stateDataStream = this.pointDataStream = messageService.asObservable().filter((message) => {
      return message instanceof RaceCompletedMessage;
    }).scan(accumulateMessages, List<RaceCompletedMessage>()).map(messagesToChanges);
  }
}
