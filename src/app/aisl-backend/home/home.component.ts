import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { Message } from '../shared/message';
import { MessageService } from '../shared/message.service';
import { RxdbDatabaseService } from '../shared/rxdb-database.service';

@Component({
  selector: 'aisl-backend-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @Input() historySize = 50;

  messages: Observable<List<Message>>;

  constructor(private messageService: MessageService, private rxdbDatabaseService: RxdbDatabaseService) {
    this.messages = this.messageService.asBoundedList(this.historySize);
    rxdbDatabaseService.get().then((x) => console.log(x));
  }

  ngOnInit() { }

  formatMsg(message: Message): string {
    return JSON.stringify(message);
  }
}
