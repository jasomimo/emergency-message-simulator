import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideMock } from '@ems/shared/testing/utils';
import { DeviceService } from '@ems/device/service/device.service';
import { UserService } from '@ems/user/service/user.service';
import { BehaviorSubject } from 'rxjs';
import { IDevice } from '@ems/device/model/device.model';
import { IUser } from '@ems/user/model/user.model';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    let mockDeviceService: DeviceService;
    let mockUserService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [provideMock(DeviceService), provideMock(UserService)],
        }).compileComponents();

        mockDeviceService = TestBed.inject(DeviceService);
        mockDeviceService.devices$ = new BehaviorSubject<IDevice[]>([]);

        mockUserService = TestBed.inject(UserService);
        mockUserService.users$ = new BehaviorSubject<IUser[]>([]);

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
