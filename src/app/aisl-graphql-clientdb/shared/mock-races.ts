import { Message } from '../../aisl-backend/shared/models';
import { RaceMocker } from '../../aisl-graphql-mockdb/shared/race-mocker';

import { pubsub } from '../../aisl-graphql-clientdb/shared/subscriptions';

export class MockRaces {
  private mocker: RaceMocker;

  constructor() {
    this.mocker = new RaceMocker(this);
    this.startMocking();
  }

  send(message: Message) {
    (<any>message)['timestamp'] = message.timestamp.toUTCString();

    switch (message.type) {
      case 'run-selected':
        pubsub.publish(message.type, { runSelected: message });
        break;
      case 'race-initiated':
        pubsub.publish(message.type, { raceInitiated: message });
        break;
      case 'race-completed':
        pubsub.publish(message.type, { raceCompleted: message });
        break;
    }
  }

  get mocking(): boolean {
    return this.mocker.mocking;
  }
  startMocking() {
    this.mocker.startMocking();
  }
  stopMocking() {
    this.mocker.stopMocking();
  }
}
