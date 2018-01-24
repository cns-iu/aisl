import { Injectable } from '@angular/core';

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

  constructor(private messageService: MessageService, private apollo: Apollo) {
    this.listenForRunSelected();
    this.listenForRaceInitiated();
    this.listenForRaceCompleted();
  }

  listenForRunSelected() {
    this.apollo.subscribe({ query: RUN_SELECTED }).subscribe({
      next: (data) => {
        const message = new RunSelectedMessage(data.data.runSelected);
        this.messageService.send(message);
        console.log(data);
      },
      error(err: any): void { console.log('err', err); }
    });
  }
  listenForRaceInitiated() {
    this.apollo.subscribe({ query: RACE_INITIATED }).subscribe({
      next: (data) => {
        const message = new RaceInitiatedMessage(data.data.raceInitiated);
        this.messageService.send(message);
        console.log(data);
      },
      error(err: any): void { console.log('err', err); }
    });
  }
  listenForRaceCompleted() {
    this.apollo.subscribe({ query: RACE_COMPLETED }).subscribe({
      next: (data) => {
        const message = new RaceCompletedMessage(data.data.raceCompleted);
        this.messageService.send(message);
        console.log(data);
      },
      error(err: any): void { console.log('err', err); }
    });
  }
}
