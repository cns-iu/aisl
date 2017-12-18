import { Message } from './message';
import { Avatar } from './avatar';
import { Persona } from './persona';

export interface RunSelectedMessage extends Message {
  type: 'run-selected';
  avatar: Avatar;
}

export interface RaceInitiatedMessage extends Message {
  type: 'race-initiated';
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
  type: 'race-completed';
  avatar: Avatar;
  results: RaceResult[];
}

export type AislMessage = RunSelectedMessage | RaceInitiatedMessage | RaceCompletedMessage | Message;

export function isAislMessage(message: Message): message is AislMessage {
  return message && [ 'run-selected', 'race-initiated', 'race-completed' ].includes(message.type);
}
