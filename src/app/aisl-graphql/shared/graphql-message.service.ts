import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { MessageService } from '../../aisl-backend';

import {
  Persona, Avatar, Message, RunSelectedMessage,
  RaceInitiatedMessage, RaceCompletedMessage, RaceResult
} from '../../aisl-backend/shared/models';

const RUN_SELECTED = gql`
  subscription runSelected {
    runSelected {
      type
      timestamp
      avatar {
        id
        name
        runMillis
      }
    }
  }
`;

const RACE_INITIATED = gql`
  subscription raceInitiated {
    raceInitiated {
      type
      timestamp
      avatar {
        id
        name
        runMillis
      }
    }
  }
`;

const RACE_COMPLETED = gql`
  subscription raceCompleted {
    raceCompleted {
      type
      timestamp
      avatar {
        id
        name
        runMillis
      }
      results {
        lane
        persona {
          id
          name
          icon
          color
          gender
          age_group
          handedness
          zipcode
          state
          latitude
          longitude
        }
        started
        falseStart
        timeMillis
      }
    }
  }
`;

@Injectable()
export class GraphQLMessageService {
  runSelected: Observable<RunSelectedMessage>;
  raceInitiated: Observable<RaceInitiatedMessage>;
  raceCompleted: Observable<RaceCompletedMessage>;

  constructor(private messageService: MessageService, private apollo: Apollo) {
    this.listenForRunSelected();
    this.listenForRaceInitiated();
    this.listenForRaceCompleted();
  }

  listenForRunSelected() {
    this.runSelected = this.apollo.subscribe({ query: RUN_SELECTED }).map((data) => {
      return new RunSelectedMessage(data.data.runSelected)
    });
    this.runSelected.subscribe({
      next: (message) => { this.messageService.send(message); },
      error(err: any): void { console.log('err', err); }
    });
  }
  listenForRaceInitiated() {
    this.raceInitiated = this.apollo.subscribe({ query: RACE_INITIATED }).map((data) => {
      return new RaceInitiatedMessage(data.data.raceInitiated)
    });
    this.raceInitiated.subscribe({
      next: (message) => { this.messageService.send(message); },
      error(err: any): void { console.log('err', err); }
    });
  }
  listenForRaceCompleted() {
    this.raceCompleted = this.apollo.subscribe({ query: RACE_COMPLETED }).map((data) => {
      return new RaceCompletedMessage(data.data.raceCompleted)
    });
    this.raceCompleted.subscribe({
      next: (message) => { this.messageService.send(message); },
      error(err: any): void { console.log('err', err); }
    });
  }
}
