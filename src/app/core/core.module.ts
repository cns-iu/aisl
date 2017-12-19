import './rxjs-operators.ts';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AislBackendModule, MessageService, MockMessageService } from '../aisl-backend';

const USE_MOCK_SERVICE = true;

const PROVIDERS: any[] = [ MessageService ];
if (USE_MOCK_SERVICE) {
  PROVIDERS[0] = { provide: MessageService, useClass: MockMessageService };
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: PROVIDERS
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
