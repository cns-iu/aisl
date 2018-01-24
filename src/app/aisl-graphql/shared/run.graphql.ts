export const RunSchema = `
type Run {
  avatar: Avatar!
  persona: Persona!

  timestamp: Int
  lane: Int
  started: Boolean
  falseStart: Boolean
  timeMillis: Int
}

type RunRecord {
  avatar: ID!
  persona: ID!

  timestamp: Date
  lane: Int
  started: Boolean
  falseStart: Boolean
  timeMillis: Int

  asRun: Run
}
`;
