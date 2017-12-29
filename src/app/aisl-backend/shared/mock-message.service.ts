import { Injectable } from '@angular/core';
export { Persona } from './database/types/persona';
import { Avatar } from './database/types/avatar';
import { Persona } from './database/types/persona';
import { Message } from './message';
import { RunSelectedMessage, RaceInitiatedMessage, RaceCompletedMessage, RaceResult } from '../shared/aisl-messages';

import { MessageService } from './message.service';

import { MockAvatar } from './database/mocks/avatar.mock';
import { MockPersona } from './database/mocks/persona.mock';

import { randomInt, randomBool, randFromList } from './database-utils';

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
    const runSelectedTime = randomInt(2000, 7000),
    raceInitiatedTime = randomInt(4000, 7000),
    raceCompletedTime = randomInt(2000, 10000);

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
      avatar: MockAvatar()
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
    if (randomBool()) {
      message.results.push(this.raceResults(randomInt(2000, maxTime), 2));
    }
    this.send(message);
    return message;
  }
  raceResults(time: number, lane: number): RaceResult {
    return <RaceResult> {
      lane,
      persona: MockPersona(),
      started: randomBool(),
      falseStart: randomBool(),
      timeMillis: time
    };
  }
}
