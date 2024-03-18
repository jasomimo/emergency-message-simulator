import { Component } from '@angular/core';
import { IDeviceComponent } from '../../model/device.model';

@Component({
  selector: 'ems-command-device',
  standalone: true,
  imports: [],
  templateUrl: './command-device.component.html',
  styleUrl: './command-device.component.scss'
})
export class CommandDeviceComponent implements IDeviceComponent {

}
