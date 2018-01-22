import { Injectable, Input } from '@angular/core';
import { Field } from '../../mav/shared/field';
import { Observable } from 'rxjs/Observable';
import { Changes } from '../../dino-core';

@Injectable()
export class ScatterplotDataService {

  xAttribute: Field = { 'label': 'Name', 'type': 'persona', 'property': 'name', 'datatype': 'string', 'kind': 'variable' };
  yAttribute: Field = { 'label': 'Run Time', 'type': 'run', 'property': 'timeMillis', 'datatype': 'number', 'kind': 'variable' };

  constructor() { }

  fetchData(rawstream: Observable<any>): Observable<Changes> {
    const xAttrName = this.xAttribute.property;
    const yAttrName = this.yAttribute.property;
    const xAttrType = this.xAttribute.type;
    const yAttrType = this.yAttribute.type;

    const stream = rawstream.map((msg) => {
      const msgArray = msg.toArray();
      return new Changes(msg.reduce((result, message) => {
        message.results.forEach((d) => {
          const obj = {
            'persona': d.persona,
            'avatar': msgArray[0].avatar
          };
          obj['persona'][yAttrType] = d[yAttrName] / 1000;
          obj['persona'][xAttrType] = Math.random() * 4;
          result.push(obj);
        });
        return result;
      }, []));

    });
    return stream;
  }
}
