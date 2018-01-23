import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Changes, IField, Field, FieldProcessor } from '../../dino-core';
import { State } from './state';
import { lookupStateCode } from './state-lookup';

const testChange = new Changes([{ state: 'indiana', color: '#0000ff' }]);
const calculatedStateIdField = new Field<number>(
  'id', 'State ANSI Id',
  (data: Partial<State>): number => {
    return data.label ? lookupStateCode(data.label) : 0;
  });

@Injectable()
export class GeomapDataService {
  private stateProcessor: FieldProcessor<State>;
  private statesChange = new BehaviorSubject<Changes<State>>(new Changes<State>());
  states: Observable<Changes<State>> = this.statesChange.asObservable();

  constructor() { }

  initializeStates(
    stateDataStream: Observable<Changes> = Observable.of(testChange),
    stateField: IField<string>,
    stateColorField: IField<string>
  ): this {
    this.stateProcessor = new FieldProcessor<State>(stateDataStream, {
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
