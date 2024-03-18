import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DeviceModule { // TODO ML: consider if Modules are needed
  constructor(@SkipSelf() @Optional() self: DeviceModule) {
    if (self) {
      throw new Error('DeviceModule should be imported only once, in main app module.');
    }
  }
}
