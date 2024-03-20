import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { provideMock } from '@ems/shared/testing/utils';
import { DeviceService } from '@ems/device/service/device.service';
import { UserService } from '@ems/user/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { IDevice } from '@ems/device/model/device.model';
import { IUser } from '@ems/user/model/user.model';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    let mockDeviceService: DeviceService;
    let mockUserService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToolbarComponent],
            providers: [provideMock(DeviceService), provideMock(UserService), provideMock(MatSnackBar)],
        }).compileComponents();

        mockDeviceService = TestBed.inject(DeviceService);
        mockDeviceService.devices$ = new BehaviorSubject<IDevice[]>([]);

        mockUserService = TestBed.inject(UserService);
        mockUserService.users$ = new BehaviorSubject<IUser[]>([]);

        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
