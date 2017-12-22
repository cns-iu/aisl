import { Component, Input, OnInit } from '@angular/core';
import { AislMavDataMassagerService }  from '../shared/aisl-mav-data-massager.service';
import { Field } from '../../mav/shared/field';
@Component({
  selector: 'aisl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.sass'],
  providers: [ AislMavDataMassagerService ]
})
export class ScatterplotComponent implements OnInit {

  data:any;
  xAttributeSelected:Field;
  yAttributeSelected:Field;

  constructor(public massager: AislMavDataMassagerService ) { }

  /*** This function gets data from massager service based on fields selected ***/
    fetchData(){
      if ((this.xAttributeSelected==null) || (this.yAttributeSelected==null))
        return;
      let xAttrName = this.xAttributeSelected.property;
      let yAttrName = this.yAttributeSelected.property;
      let xAttrType = this.xAttributeSelected.type;
      let yAttrType = this.yAttributeSelected.type;

      let refToData = this.data;

      this.massager.raceCompleted.subscribe(
        (msg) => {
          let runData = msg.toArray();
          runData[0].results.forEach(function(d){
            const data = {'persona': d.persona, 'avatar': runData[0].avatar, 'run': d};
            refToData.push([Math.random()*((15 - 1) + 1), data[yAttrType][yAttrName]/1000]);
            console.log(refToData);
          });
          this.data = this.data.concat();
        }
      );
    }

  ngOnInit() {
  this.data = [];
  //this.fetchData();
  }

  setXAttribute(xAttr){
    console.log(xAttr);
    this.xAttributeSelected = xAttr;
    this.fetchData();
  }

  setYAttribute(yAttr){
      console.log(yAttr);
      this.yAttributeSelected = yAttr;
      this.fetchData();
    }
}
