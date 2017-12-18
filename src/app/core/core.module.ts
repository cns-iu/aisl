import './rxjs-operators.ts';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AislBackendModule, MessageService } from '../aisl-backend';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [MessageService]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
