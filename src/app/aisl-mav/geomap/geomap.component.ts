import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { List } from 'immutable';

import { IField, Changes } from '../../dino-core';

import { GeomapDataService } from '../shared/geomap-data.service';

/*function getStates(messages: RaceCompletedMessage[]): any {
  const states = messages.reduce((result, message) => {
    message.results.forEach((r) => result.push(r.persona.state));
    return result;
  }, []);

  return states.map((state) => ({state, color: '#0000ff'}));
}*/

@Component({
  selector: 'aisl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [GeomapDataService]
})
export class GeomapComponent implements OnInit {
  private stateDataStream: Observable<Changes>;

  stateField: IField<any>;
  stateColorField: IField<any>;

  stateFields: IField<any>[];
  stateColorFields: IField<any>[];

  pointDataStream: Observable<Changes>;

  /*constructor(messageService: MessageService) {
    const maxConcurrentResults = 1;
    this.stateDataStream = messageService.asObservable().filter((message) => {
      return message instanceof RaceCompletedMessage;
    }).scan((acc: List<RaceCompletedMessage>, current: RaceCompletedMessage) => {
      if (acc.size === maxConcurrentResults + 1) {
        acc = acc.shift();
      }

      return acc.push(current);
    }, List<RaceCompletedMessage>()).map((messages) => messages.toJS()).map((messages) => {
      let added = [];
      let removed = [];
      if (messages.length !== maxConcurrentResults + 1) {
        added = messages;
      } else {
        added = messages.slice(1);
        removed = messages.slice(0, 1);
      }

      return new Changes(getStates(added), getStates(removed));
    });*/
  constructor(public massager: GeomapDataService) {
    this.stateDataStream = massager.stateDataStream;

    this.stateField = massager.stateFields[0];
    this.stateColorField = massager.stateColorFields[1];

    this.stateFields = massager.stateFields;
    this.stateColorFields = massager.stateColorFields;

    this.pointDataStream = massager.pointDataStream;
  }

  ngOnInit() {
  }
}
