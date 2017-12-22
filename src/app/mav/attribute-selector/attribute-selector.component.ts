import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Field } from '../shared/field';

@Component({
  selector: 'mav-attribute-selector',
  templateUrl: './attribute-selector.component.html',
  styleUrls: ['./attribute-selector.component.sass']
})
export class AttributeSelectorComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<Field> = new MatTableDataSource();
  constructor() { }

  ngOnInit() {
  }

}
