import { pubsub } from './subscriptions';

export const resolvers: any = {
  Query: () => { },
  Mutation: () => { },
  Subscription: {
    runSelected: {
      subscribe: () => pubsub.asyncIterator('run-selected')
    },
    raceInitiated: {
      subscribe: () => pubsub.asyncIterator('race-initiated')
    },
    raceCompleted: {
      subscribe: () => pubsub.asyncIterator('race-completed')
    },
    newRaceCompletedRecords: {
      subscribe: () => pubsub.asyncIterator('new-race-completed-records')
    },
    newRaceCompleted: {
      subscribe: () => pubsub.asyncIterator('new-race-completed')
    },
  }
};
