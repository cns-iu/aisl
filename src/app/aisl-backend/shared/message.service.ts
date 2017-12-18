import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Message } from './message';

@Injectable()
export class MessageService {
  private subject = new Subject<Message>();

  send(message: Message) {
    this.subject.next(message);
  }

  asObservable(): Observable<Message> {
    return this.subject.asObservable();
  }

  observe(T: new () => Message): Observable<Message> {
    return this.subject.asObservable().filter((m) => m instanceof T);
  }

  constructor() { }
}
