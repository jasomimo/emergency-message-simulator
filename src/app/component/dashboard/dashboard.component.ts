import { Component } from '@angular/core';
import { FieldDeviceComponent } from '@ems/device/component/field-device/field-device.component';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'ems-dashboard',
  standalone: true,
  imports: [FieldDeviceComponent, PanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
