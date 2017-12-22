import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTabsModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [ MatTableModule, MatSidenavModule, MatTabsModule ],
  exports: [ MatTableModule, MatSidenavModule, MatTabsModule ],
  declarations: []
})
export class SharedModule { }
