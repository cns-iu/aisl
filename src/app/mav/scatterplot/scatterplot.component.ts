import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-scatterplot',
  templateUrl: './scatterplot.component.html',
  styles: [
    `
    .draggable {
      border: 1px solid #ccc;
      margin: 1rem;
      padding: 1rem;
      width: 6rem;
      cursor: move;
    }

    .drop-target {
      border: 1px dashed #ebebeb;
      margin: 1rem;
      padding: 1rem;
      width: 6rem;
    }
    `
  ]
  // styleUrls: ['./scatterplot.component.sass']
})
export class ScatterplotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
