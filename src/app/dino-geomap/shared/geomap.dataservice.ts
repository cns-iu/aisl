import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Changes } from '../../dino-core';
import { State } from './state';

@Injectable()
export class GeomapDataService {
  private statesChange = new BehaviorSubject<Changes<State>>(new Changes<State>());
  states: Observable<Changes<State>> = this.statesChange.asObservable();

  constructor() {}



  // initialize(...) {
  //   this.dataStates = new FieldProcessor<State>({
  //     stream: stateStream,
  //     idField: 'state',
  //     fields: {
  //       'state': Field
  //       'x': FileList,
  //       'y': field
  //     }
  //   }).$.subscribe((change) => {
  //     this.states.next(change);
  //   })
  // }
}
