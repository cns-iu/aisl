import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Field } from '../../mav/shared/field';

@Component({
  selector: 'aisl-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.sass']
})
export class FieldListComponent implements OnInit {
  @Input() fields: Field[];

  dataSource: MatTableDataSource<Field> = new MatTableDataSource();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.fields;
    console.log(this.fields);
  }

}
