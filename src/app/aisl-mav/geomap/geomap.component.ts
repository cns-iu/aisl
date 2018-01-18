import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { List } from 'immutable';

import { MessageService, RaceCompletedMessage } from '../../aisl-backend';
import { Changes } from '../../dino-core';

function getStates(messages: RaceCompletedMessage[]): any {
  const states = messages.reduce((result, message) => {
    message.results.forEach((r) => result.push(r.persona.state));
    return result;
  }, []);

  return states.map((state) => ({state, color: '#0000ff'}));
}

@Component({
  selector: 'aisl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {

  private stateStream: Observable<Changes>;

  constructor(messageService: MessageService) {
    const maxConcurrentResults = 1;
    this.stateStream = messageService.asObservable().filter((message) => {
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
    });
  }

  ngOnInit() {
  }

}
