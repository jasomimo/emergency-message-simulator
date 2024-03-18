import { Component, OnInit } from '@angular/core';
import { FieldDeviceComponent } from '@ems/device/component/field-device/field-device.component';
import { PanelComponent } from '../panel/panel.component';
import { DeviceService } from '@ems/device/service/device.service';
import { Observable } from 'rxjs';
import { IDevice } from '@ems/device/model/device.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ems-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FieldDeviceComponent, 
    PanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  fieldDevices$: Observable<IDevice[]>;

  constructor(private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.fieldDevices$ = this.deviceService.getFieldDevices$();
  }

}
