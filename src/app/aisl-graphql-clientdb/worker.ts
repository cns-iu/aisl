import { createWorker, handleSubscriptions } from 'apollo-link-webworker';

import { MockRaces } from './shared/mock-races';

import { schema } from './shared/schema';
import { context } from './shared/context';
import { pubsub } from './shared/subscriptions';

createWorker({
  schema,
  context
});

self.onmessage = message => handleSubscriptions({
  self,
  message,
  schema,
  context,
  pubsub,
});

const racer = new MockRaces();
