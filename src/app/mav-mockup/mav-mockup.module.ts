import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    MainContentComponent,
    HomeComponent
  ],
  declarations: [SidebarComponent, MainContentComponent, HomeComponent]
})
export class MavMockupModule { }
