import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Changes, IField, Field, FieldProcessor } from '../../dino-core';
import { State } from './state';
// import { lookupStateCode } from './state-lookup';

// Field defaults
const defaultStateField = new Field<string>('state', 'State');
const defaultStateColorField = new Field<string>('color', 'State Color');

// Calculated fields
const calculatedStateIdField = new Field<number>(
  'id', 'State ANSI Id',
  (data: Partial<State>): number => {
    return 0; // return data.label ? lookupStateCode(data.label) : 0;
  }
);

// State name to id lookup
// TODO

const testChange = new Changes([{state: 'indiana', color: '#0000ff'}]);

@Injectable()
export class GeomapDataService {
  private stateProcessor: FieldProcessor<State>;
  private statesChange = new BehaviorSubject<Changes<State>>(new Changes<State>());
  states: Observable<Changes<State>> = this.statesChange.asObservable();

  constructor() {}

  initializeStates(
    stream: Observable<Changes> = Observable.of(testChange),
    stateField: IField<string> = defaultStateField,
    stateColorField: IField<string> = defaultStateColorField
  ): this {
    this.stateProcessor = new FieldProcessor<State>(stream, {
      label: stateField,
      color: stateColorField
    }, {
      id: calculatedStateIdField
    });

    // XXX Does this need to be stored for later removal?
    this.stateProcessor.asObservable().subscribe((change) => {
      this.statesChange.next(change);
    });

    return this;
  }
}
