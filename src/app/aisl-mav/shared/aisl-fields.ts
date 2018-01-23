// export const AISL_FIELDS: Field[] = [
//   {'label': 'Name', 'type': 'persona', 'property': 'name', 'datatype': 'string', 'kind': 'variable'},
//   {'label': 'Avatar', 'type': 'avatar', 'property': 'name', 'datatype': 'string', 'kind': 'variable'},
//   {'label': 'Run Time', 'type': 'run', 'property': 'timeMillis', 'datatype': 'number', 'kind': 'variable'}
// ];

import { IField, Field } from '../../dino-core';

export const AISL_FIELDS: IField<any>[] = [
  new Field<string>('name', 'Name', (item: any): string => {
    return item.persona.name;
  }),
  new Field<number>('timeMillis', 'Run Time', (item: any): number => {
    return item.persona.timeMillis;
  }, (value: number) => value / 1000.0)
];
