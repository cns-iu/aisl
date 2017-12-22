import { Component, OnInit } from '@angular/core';
import { AislMavDataMassagerService }  from '../shared/aisl-mav-data-massager.service';

@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ AislMavDataMassagerService ]
})
export class ScatterplotComponent implements OnInit {

  constructor(public massager: AislMavDataMassagerService ) { }

  ngOnInit() {
  }

}
