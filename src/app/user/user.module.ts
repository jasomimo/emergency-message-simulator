import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  constructor(@SkipSelf() @Optional() self: UserModule) {
    if (self) { // TODO: consider if self check is necessary when services are registered in root
      throw new Error('UserModule should be imported only once, in main app module.');
    }
  }
}
