import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatTabsModule } from '@angular/material';

@NgModule({
  imports: [ MatSidenavModule, MatTabsModule ],
  exports: [ MatSidenavModule, MatTabsModule ],
})
export class MaterialModule { }
