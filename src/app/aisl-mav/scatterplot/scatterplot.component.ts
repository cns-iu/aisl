import { Component, Input, OnInit } from '@angular/core';
import { AislMavDataMassagerService } from '../shared/aisl-mav-data-massager.service';
import { Field } from '../../mav/shared/field';
@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ AislMavDataMassagerService ]
})
export class ScatterplotComponent implements OnInit {

  newData: [number, number][] = [];
  xAttributeSelected: Field;
  yAttributeSelected: Field;

  constructor(public massager: AislMavDataMassagerService ) { }

  /*** This function gets data from massager service based on fields selected ***/
    fetchData() {
      if ((this.xAttributeSelected == null) || (this.yAttributeSelected == null)) {
        return; }
      const xAttrName = this.xAttributeSelected.property;
      const yAttrName = this.yAttributeSelected.property;
      const xAttrType = this.xAttributeSelected.type;
      const yAttrType = this.yAttributeSelected.type;

      this.massager.raceCompleted.subscribe(
        (msg) => {
          const runData = msg.toArray();
          runData[0].results.forEach((d) => {
            const data = {'persona': d.persona, 'avatar': runData[0].avatar, 'run': d};
            // this.newData.push([Math.random()*((15 - 1) + 1), data[yAttrType][yAttrName]/1000]);
            this.newData.push([Math.random() * 4, data[yAttrType][yAttrName] / 1000]);
            console.log('newData from aisl-mav', this.newData);
          });
          this.newData = this.newData.concat();
        }
      );
    }

  ngOnInit() {

  // this.fetchData();
  }

  setXAttribute(xAttr) {
    console.log(xAttr);
    this.xAttributeSelected = xAttr;
    this.fetchData();
  }

  setYAttribute(yAttr) {
      console.log(yAttr);
      this.yAttributeSelected = yAttr;
      this.fetchData();
    }
}
