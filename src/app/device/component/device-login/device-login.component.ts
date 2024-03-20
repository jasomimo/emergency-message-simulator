import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '@ems/user/model/user.model';
import { UserService } from '@ems/user/service/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'ems-device-login',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule],
    templateUrl: './device-login.component.html',
    styleUrl: './device-login.component.scss',
})
export class DeviceLoginComponent implements OnInit {
    @Output()
    userLogin = new EventEmitter<IUser>();

    selectedUser?: IUser;
    users$: Observable<IUser[]>;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.users$ = this.userService.users$;
    }

    onLogin(): void {
        if (!this.selectedUser) {
            return;
        }

        this.userLogin.next(this.selectedUser);
    }
}
