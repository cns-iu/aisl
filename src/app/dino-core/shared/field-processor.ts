import { Observable } from 'rxjs/Observable';

import { Changes, DatumId, isDatumId } from './changes';
import { IField } from './field';

type FieldRefs<T> = {
  [P in keyof T]: IField<T[P]>;
};

export class FieldProcessor<T> {
  constructor(
    public stream: Observable<Changes>,
    public fields: FieldRefs<T>
  ) { }

  asObservable(): Observable<Changes<T>> {
    return this.stream.map((changes: Changes): Changes<T> => {
      return new Changes<T>(
        this.mapAdd(changes.add),
        this.mapRemove(changes.remove),
        this.mapUpdate(changes.update)
      );
    });
  }

  private mapItem(item: any): T {
    return Object.entries(this.fields).reduce((result: any, [key, field]) => {
      result[key] = field.get(item);
      return result;
    }, {}) as T;
  }

  private mapPartialItem(item: any): Partial<T> {
    return Object.entries(this.fields).reduce((result: any, [key, field]) => {
      const value = field.get(item);
      if (value != null) {
        result[key] = value;
      }

      return result;
    }, {}) as T;
  }

  private mapAdd(items: any[]): T[] {
    return items.map((item) => this.mapItem(item));
  }

  private mapRemove(items: (DatumId | any)[]): (DatumId | T)[] {
    return items.map((itemOrId) => {
      return isDatumId(itemOrId) ? itemOrId : this.mapItem(itemOrId);
    });
  }

  private mapUpdate(items: [DatumId | any, Partial<any>][]): [DatumId | T, Partial<T>][] {
    return items.map(([key, update]): [DatumId | T, Partial<T>] => {
      const newKey = isDatumId(key) ? key : this.mapItem(key);
      const newUpdate = this.mapPartialItem(update);

      return [newKey, newUpdate];
    });
  }
}
