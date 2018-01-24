import { AvatarSchema } from './avatar.graphql';
import { PersonaSchema } from './persona.graphql';
import { RunSchema } from './run.graphql';
import { MessagesSchema } from './messages.graphql';

export const schemaDef = `
scalar Date

${AvatarSchema}
${PersonaSchema}
${RunSchema}
${MessagesSchema}

type Query {
  avatar(id: ID): Avatar
}

type Mutation {
  avatar(id: ID): Avatar
}

type Subscription {
  runSelected: RunSelectedMessage
  raceInitiated: RaceInitiatedMessage
  raceCompleted: RaceCompletedMessage
  newRaceCompletedRecords: [RunRecord]!
  newRaceCompleted: [Run]!
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
