import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

import { AppState } from '../../store/app.reducer';
import * as EditProfileActions from './store/profile-edit.actions';
import { ProfileEditService } from './profile-edit.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
    public profileForm: FormGroup;
    url: string | Blob;
    isUpdate: boolean;
    defaultImage = '../../assets/avatarDefault.png';
    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<AppState>,
        private profileEditService: ProfileEditService,
    ) {}

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            userName: this.formBuilder.control(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
            userSurname: this.formBuilder.control(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
        });

        this.store
            .select('editProfile')
            .pipe(takeUntil(this.destroy$))
            .subscribe(info => {
                if (info && info.name && !info.isError) {
                    this.profileForm.get('userName').setValue(info.name);
                    this.profileForm.get('userSurname').setValue(info.surname);
                    this.url = info.avatar;
                    if (this.isUpdate) {
                        this.dialogSubmit(`Updated!
                         ${info.name}`);
                    }
                } else if (!info || info.isError) {
                    this.dialogSubmit(`UNSUCCESSFUL!`);
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    forSubmitDialog() {
        this.profileEditService.delPreviousUrl();
        this.isUpdate = true;
    }

    dialogSubmit(message) {
        this.dialog.open(SubmitDialogComponent, {
            height: '20vh',
            width: '30vw',
            data: { message: `${message}` },
        });
    }

    addAvatar(event) {
        const dialogRef = this.dialog.open(ModalDialogComponent, {
            height: '500px',
            width: '500px',
            data: event,
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                if (result) {
                    this.url = result.base64 || this.url || this.defaultImage;
                }
            });
    }

    getRawData(): void {
        this.store.dispatch(
            new EditProfileActions.ProfileEditSet({
                name: this.profileForm.get('userName').value,
                surname: this.profileForm.get('userSurname').value,
                avatar: this.profileEditService.getUrl() || this.defaultImage,
            }),
        );
    }

    confirmDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: { email: '', password: '' },
        });
        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.profileEditService
                    .updateUser(value.email, value.password)
                    .subscribe(
                        user =>
                            this.profileEditService
                                .deleteUser((user as any).idToken)
                                .subscribe(() => {
                                    this.store.dispatch(
                                        new AuthActions.Logout(),
                                    );
                                }),
                        () => {
                            this.dialog.open(SubmitDialogComponent, {
                                width: '350px',
                                data: { message: 'Wrong password or email' },
                            });
                        },
                    );
            });
    }
}
