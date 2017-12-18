import { Message } from './message';
import { Avatar } from './avatar';
import { Persona } from './persona';

export interface RunSelectedMessage extends Message {
  avatar: Avatar;
}

export interface RaceInitiatedMessage extends Message {
  avatar: Avatar;
}

export interface RaceResult {
  lane: number; // 1 to N
  persona: Persona;
  started: boolean;
  falseStart: boolean;
  timeMillis: number;
}

export interface RaceCompletedMessage extends Message {
  avatar: Avatar;
  results: RaceResult[];
}
