import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'mav-attribute-selector',
  templateUrl: './attribute-selector.component.html',
  styles: [
    `
    .draggable {
      border: 1px solid #ccc;
      margin: 1rem;
      padding: 1rem;
      width: 2.5rem;
      cursor: move;
    }

    .drop-target {
      border: 1px dashed #ebebeb;
      margin: 1rem;
      padding: 1rem;
      width: 2.5rem;
    }
    `
  ]
  // ,styleUrls: ['./attribute-selector.component.sass']
})
export class AttributeSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
