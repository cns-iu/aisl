import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDisplayComponent } from './time-display/time-display.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TimeDisplayComponent, HomeComponent
  ],
  declarations: [TimeDisplayComponent, HomeComponent]
})
export class AislEndlineModule { }
