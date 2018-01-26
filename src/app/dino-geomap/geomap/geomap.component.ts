import { ElementRef, Component, Input, SimpleChanges, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { vega, defaultLogLevel } from '../../vega';
import { IField, Changes } from '../../dino-core';
import { makeChangeSet } from '../../dino-vega';
import { State } from '../shared/state';
import { GeomapDataService } from '../shared/geomap.dataservice';
import * as us10m from '../shared/us-10m.json';
import * as geomapSpec from '../shared/spec.json';

@Component({
  selector: 'dino-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.sass'],
  providers: [GeomapDataService]
})
export class GeomapComponent implements OnInit, OnDestroy, OnChanges {
  @Input() stateField: IField<string>;
  @Input() stateColorField: IField<string>;
  @Input() stateDataStream: Observable<Changes>;
  @Input() pointDataStream: Observable<Changes>;
  @Input() pointLatitudeField: IField<number>;
  @Input() pointLongitudeField: IField<number>;

  private nativeElement: any;
  private view: any = null;
  private statesSubscription: Subscription;
  private pointSubscription: Subscription;

  constructor(element: ElementRef, private dataService: GeomapDataService) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.updateStreamProcessor();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'stateDataStream' && this.stateDataStream) {
        this.updateStreamProcessor();
      } else if (propName === 'stateField' && this.stateField) {
        this.updateStreamProcessor();
      } else if (propName === 'stateColorField' && this.stateColorField) {
        this.updateStreamProcessor();
      }
    }
  }

  ngOnDestroy() {
    this.finalizeView();
  }

  updateStreamProcessor() {
    if (this.stateDataStream && this.stateField && this.stateColorField) {
      this.dataService.initializeStates(
        this.stateDataStream, this.stateField, this.stateColorField
      );
    }
    this.renderView(geomapSpec);
  }

  private renderView(spec: any) {
    this.finalizeView(); // Remove any old view

    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize(this.nativeElement)
      .logLevel(defaultLogLevel)
      .hover()
      .insert('states', vega.read(us10m, {
        type: 'topojson',
        feature: 'states'
      }))
      // TODO add stateColor and points data
      .run();

    this.statesSubscription = this.dataService.states.subscribe((change: Changes<State>) => {
      this.view.change('stateColorCoding', makeChangeSet<State>(change, 'id')).run();
    });
  }

  private finalizeView() {
    if (this.statesSubscription) {
      this.statesSubscription.unsubscribe();
    }
    if (this.pointSubscription) {
      this.pointSubscription.unsubscribe();
    }
    if (this.view) {
      this.view.finalize();
    }
  }
}
