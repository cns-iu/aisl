
export class Field {
  label: string;
  type: string;
  property: string;
  datatype: string;
  kind: string;

  constructor(options: any = {}) {
    Object.assign(this, options);
  }
}
