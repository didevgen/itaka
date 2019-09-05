import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

import { ProfileEditState } from './store/profile-edit.reducer';
import { ProfileEditSet } from './store/profile-edit.actions';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
    public profileForm: FormGroup;
    url: string;
    defaultImage = '../../assets/avatarDefault.png';
    public subscription$ = new Subject();
    private pic;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<ProfileEditState>,
    ) {}

    ngOnInit(): void {
        this.pic = 'imageDefault';
        this.profileForm = this.formBuilder.group({
            userName: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(2),
            ]),
            userSurname: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(2),
            ]),
        });

        this.store.pipe(takeUntil(this.subscription$)).subscribe(inf => {
            console.log(inf.editProfile);
            this.profileForm.get('userName').setValue(inf.editProfile.name);
            this.profileForm.get('userSurname').setValue(inf.editProfile.surName);
            this.url = localStorage.getItem('imgUrl') || this.defaultImage;
        });
    }

    ngOnDestroy() {
        this.subscription$.next();
        this.subscription$.complete();
    }

    addAvatar(event) {
        const dialogRef = this.dialog.open(ModalDialogComponent, {
            height: '500px',
            width: '500px',
            data: event,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.url = result;
            // this.profileForm.get('avatar').setValue(event.target.files[0]);
        });
    }

    getRawData(img): void {
        this.pic = 'imageNew';

        this.store.dispatch(
            new ProfileEditSet({
                name: this.profileForm.get('userName').value,
                surName: this.profileForm.get('userSurname').value,
                avatar: this.pic,
                isError: false,
            }),
        );
    }
}
