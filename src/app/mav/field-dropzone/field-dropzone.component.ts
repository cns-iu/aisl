import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IField } from '../../dino-core';
@Component({
  selector: 'mav-field-dropzone',
  templateUrl: './field-dropzone.component.html',
  styleUrls: ['./field-dropzone.component.sass']
})
export class FieldDropzoneComponent implements OnInit {
  @Input() label: String;
  @Input() fields: IField<any>[];
  @Input() field: IField<any>;
  @Output() fieldChange = new EventEmitter<IField<any>>();

  constructor() { }

  ngOnInit() { }

  fieldDropped(field: any) {
    const matches = this.fields.filter((f) => JSON.stringify(f) === JSON.stringify(field));
    if (matches.length > 0) {
      this.field = matches[0];
      this.fieldChange.emit(this.field);
    }
  }
}
