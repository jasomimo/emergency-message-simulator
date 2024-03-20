import { Component, OnInit } from '@angular/core';
import { FieldDeviceComponent } from '@ems/device/component/field-device/field-device.component';
import { DeviceService } from '@ems/device/service/device.service';
import { Observable } from 'rxjs';
import { IDevice } from '@ems/device/model/device.model';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommandDeviceComponent } from '@ems/device/component/command-device/command-device.component';
import { AlertMessageBoxComponent } from '@ems/message/component/alert-message-box/alert-message-box.component';



@Component({
  selector: 'ems-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FieldDeviceComponent, 
    CommandDeviceComponent, 
    ToolbarComponent,
    AlertMessageBoxComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  fieldDevices$: Observable<IDevice[]>;
  commandDevice$: Observable<IDevice | undefined>;

  constructor(private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.fieldDevices$ = this.deviceService.getFieldDevices$();
    this.commandDevice$ = this.deviceService.getCommandDevice$();
  }

}
