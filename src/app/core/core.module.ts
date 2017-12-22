import './rxjs-operators.ts';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AislBackendModule, MessageService, MockMessageService, RxdbDatabaseService } from '../aisl-backend';

const PROVIDERS: any[] = [
  // MessageService,
  { provide: MessageService, useClass: MockMessageService },
  RxdbDatabaseService
];

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
