import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

import {
    ProfileEditSet,
    ProfileEditUpdate,
} from './store/profile-edit.actions';
import { AppState } from '../../store/app.reducer';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
    public profileForm: FormGroup;
    url: string;
    isUpdate: boolean;
    defaultImage = '../../assets/avatarDefault.png';
    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<AppState>,
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
                if (info.name && !info.isError) {
                    this.profileForm.get('userName').setValue(info.name);
                    this.profileForm.get('userSurname').setValue(info.surname);
                    this.url = this.defaultImage;
                    if (this.isUpdate) {
                        this.dialogSubmit(`OK! ${info.name}\n${info.surname}`);
                    }
                } else if (info.isError) {
                    this.dialogSubmit(
                        `UNSUCCESSFUL!\ncheck your connection please`,
                    );
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    dialogSubmit(message) {
        this.dialog.open(SubmitDialogComponent, {
            height: '40vh',
            width: '40vw',
            data: { message: `${message}` },
        });
    }
    forSubmitDialog() {
        this.isUpdate = true;
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
                this.url = result;
            });
    }

    getRawData(): void {
        this.store.dispatch(
            new ProfileEditSet({
                name: this.profileForm.get('userName').value,
                surname: this.profileForm.get('userSurname').value,
                avatar: '', // will be new img url
            }),
        );
    }
}
