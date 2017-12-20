import { Injectable } from '@angular/core';

import { Avatar } from '../shared/avatar';
import { Persona } from '../shared/persona';
import { Message } from '../shared/message';
import { RunSelectedMessage, RaceInitiatedMessage, RaceCompletedMessage, RaceResult } from '../shared/aisl-messages';

import { MessageService } from './message.service';

const AVATARS: string[] = [
  'dinosaur', 't-rex', 'olympian', 'caveman', 'cow', 'dog', 'your mom', 'lemon'
];

@Injectable()
export class MockMessageService extends MessageService {

  constructor() {
    super();
    this.startMocking();
    console.log(this);
  }

  private _mocking = false;
  get mocking(): boolean {
    return this._mocking;
  }

  startMocking() {
    if (!this.mocking) {
      this._mocking = true;
      this.mockRace();
    }
  }
  stopMocking() {
    this._mocking = false;
  }

  protected mockRace() {
    const runSelectedTime = this.randomInt(2000,7000),
      raceInitiatedTime = this.randomInt(4000,7000),
      raceCompletedTime = this.randomInt(2000,10000);

    setTimeout(() => {
      const runSelectedMessage = this.runSelected();
      setTimeout(() => {
        this.raceInitiated(runSelectedMessage.avatar);
        setTimeout(() => {
          this.raceCompleted(runSelectedMessage.avatar, raceCompletedTime);

          if (this.mocking) {
            this.mockRace();
          }
        }, raceCompletedTime);
      }, raceInitiatedTime);
    }, runSelectedTime);
  }

  runSelected(): RunSelectedMessage {
    const message = new RunSelectedMessage({
      avatar: <Avatar>{ name: this.randFromList<string>(AVATARS) }
    });
    this.send(message);
    return message;
  }
  raceInitiated(avatar: Avatar): RaceInitiatedMessage {
    const message = new RaceInitiatedMessage({
      avatar
    });
    this.send(message);
    return message;
  }
  raceCompleted(avatar: Avatar, maxTime: number): RaceCompletedMessage {
    const message = new RaceCompletedMessage({
      avatar,
      results: [this.raceResults(maxTime, 1)]
    });
    if (this.randomBool()) {
      message.results.push(this.raceResults(this.randomInt(2000, maxTime), 2));
    }
    this.send(message);
    return message;
  }
  raceResults(time: number, lane: number): RaceResult {
    return <RaceResult> {
      lane,
      persona: <Persona>{name: 'person'+this.randomInt(1, 500)},
      started: this.randomBool(),
      falseStart: this.randomBool(),
      timeMillis: time
    }
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  randomBool(): boolean {
    return Math.random() > 0.5;
  }
  randFromList<T>(list: T[]): T {
    const index = this.randomInt(0, list.length - 1);
    return list[index];
  }

}
