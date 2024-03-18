import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MessageModule {
  constructor(@SkipSelf() @Optional() self: MessageModule) {
    if (self) {
      throw new Error('MessageModule should be imported only once, in main app module.');
    }
  }
}
