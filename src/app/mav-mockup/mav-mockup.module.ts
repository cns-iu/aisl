import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    MainContentComponent
  ],
  declarations: [SidebarComponent, MainContentComponent]
})
export class MavMockupModule { }
