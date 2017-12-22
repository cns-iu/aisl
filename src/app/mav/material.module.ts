import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTabsModule } from '@angular/material';

@NgModule({
  imports: [ MatTableModule, MatTabsModule ],
  exports: [ MatTableModule, MatTabsModule ],
})
export class MaterialModule { }
