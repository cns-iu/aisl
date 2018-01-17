export type DatumId = string | number;

export class Changes<T = any> {
  constructor(
    public add: T[] = [],
    public remove: (DatumId | T)[] = [],
    public update: [DatumId | T, Partial<T>][] = []
  ) {}
}
