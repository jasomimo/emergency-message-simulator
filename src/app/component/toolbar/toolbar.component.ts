import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '@ems/device/service/device.service';
import { UserService } from '@ems/user/service/user.service';
import { countries, starWars, uniqueNamesGenerator } from 'unique-names-generator';
import { IUser } from '@ems/user/model/user.model';
import { IDevice } from '@ems/device/model/device.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ems-toolbar',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit, OnDestroy {
    users: IUser[];
    devices: IDevice[];

    private subscription = new Subscription();

    constructor(
        private deviceService: DeviceService,
        private userService: UserService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.subscription.add(this.userService.users$.subscribe((users) => (this.users = users)));

        this.subscription.add(this.deviceService.devices$.subscribe((devices) => (this.devices = devices)));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onAddUser(): void {
        const name = this.getUniqueUserName();
        const user: IUser = { name };

        this.userService.addUser(user);
        this.snackBar.open('User added', 'Close');
    }

    onAddDevice(): void {
        const deviceName = this.getUniqueDeviceName();

        this.deviceService.addFieldDevice(deviceName);
        this.snackBar.open('Field device added', 'Close');
    }

    private getUniqueUserName(): string {
        let uniqueName: string;
        let userExists: IUser | undefined;

        do {
            uniqueName = uniqueNamesGenerator({ dictionaries: [starWars] });
            userExists = this.users.find((u) => u.name === uniqueName);
        } while (userExists);

        return uniqueName;
    }

    private getUniqueDeviceName(): string {
        let deviceName: string;
        let deviceExists: IDevice | undefined;

        do {
            deviceName = uniqueNamesGenerator({ dictionaries: [countries] });
            deviceExists = this.devices.find((d) => d.name === deviceName);
        } while (deviceExists);

        return deviceName;
    }
}
