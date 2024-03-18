import { Component, Input } from '@angular/core';
import { IDevice, IDeviceComponent } from '../../model/device.model';

@Component({
  selector: 'ems-field-device',
  standalone: true,
  imports: [],
  templateUrl: './field-device.component.html',
  styleUrl: './field-device.component.scss'
})
export class FieldDeviceComponent implements IDeviceComponent {
  @Input()
  device: IDevice;
}
