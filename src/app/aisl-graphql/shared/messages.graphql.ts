export const MessagesSchema = `
interface Message {
  type: String
  timestamp: Date
}

type RunSelectedMessage implements Message {
  type: String
  timestamp: Date
  avatar: Avatar
}

type RaceInitiatedMessage implements Message {
  type: String
  timestamp: Date
  avatar: Avatar
}

type RaceResult {
  lane: Int
  persona: Persona
  started: Boolean
  falseStart: Boolean
  timeMillis: Int
}

type RaceCompletedMessage implements Message {
  type: String
  timestamp: Date
  avatar: Avatar
  results: [RaceResult]!
}

`;
