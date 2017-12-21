import { Component, OnInit } from '@angular/core';

import { Field } from '../../mav/shared/field';

@Component({
  selector: 'aisl-mav-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fields: Field[] = [new Field('abc'), new Field('def')];

  constructor() { }

  ngOnInit() {
  }

}
