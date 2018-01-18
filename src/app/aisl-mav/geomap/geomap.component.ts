import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/bufferTime';

import { MessageService, RaceCompletedMessage } from '../../aisl-backend';
import { Changes } from '../../dino-core';

@Component({
  selector: 'aisl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass']
})
export class GeomapComponent implements OnInit {

  private stream: Observable<Changes>;

  constructor(messageService: MessageService) {
    this.stream = messageService.asObservable().filter((message) => {
      return message instanceof RaceCompletedMessage;
    }).concatMap((message: RaceCompletedMessage) => {
      return message.results.map((result) => result.persona.state);
    }).map((state) => {
      return {state, color: '#0000ff'};
    }).bufferTime(500).map((states) => {
      return new Changes<any>(states);
    });
  }

  ngOnInit() {
  }

}
