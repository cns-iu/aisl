import { Message } from './message';
import { Avatar } from './database/types/avatar';
import { Persona } from './database/types/persona';

export class RunSelectedMessage extends Message {
  type: string = 'run-selected';
  avatar: Avatar;
}

export class RaceInitiatedMessage extends Message {
  type: string = 'race-initiated';
  avatar: Avatar;
}

export interface RaceResult {
  lane: number; // 1 to N
  persona: Persona;
  started: boolean;
  falseStart: boolean;
  timeMillis: number;
}

export class RaceCompletedMessage extends Message {
  type: string = 'race-completed';
  avatar: Avatar;
  results: RaceResult[];
}
