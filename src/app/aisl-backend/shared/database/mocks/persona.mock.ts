import { Persona } from '../types/persona';
import * as casual from 'casual-browserify';
import { randomInt, randFromList } from '../../database-utils';

const GENDERS: string[] = ['male', 'female', 'other'];
const AGE_GROUPS: string[] = ['07-09', '10-12', '13-18', '19-30', '31-40', '41-50', '51-60', '61-70', '71+'];

export class GeneratedPersona implements Persona {
  id: string;
  name: string;
  icon: string;
  color: string;
  gender: 'male' | 'female' | 'other';
  age_group: '07-09' | '10-12' | '13-18' | '19-30' | '31-40' | '41-50' | '51-60' | '61-70' | '71+';
  handedness: 'left' | 'right';
  zipcode: string;
  state: string;

  constructor() {
    this.id = 'person'+casual.integer(1, 500);
    this.name = casual.first_name;
    this.icon = casual.word;
    this.color = casual.safe_color_name;
    this.gender = casual.random_element(GENDERS);
    this.age_group = casual.random_element(AGE_GROUPS);
    this.handedness = casual.random > 0.1 ? 'right' : 'left';
    this.zipcode = casual.zip(5);
    this.state = casual.state;
  }
}

export function MockPersona(source: 'generate' | 'database' = 'generate', db: any = null): Persona {
  if (source == 'database' && db) {
    //FIXME: Pull from db
    return new GeneratedPersona();
  } else {
    return new GeneratedPersona();
  }
}
