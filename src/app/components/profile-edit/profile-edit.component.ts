import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { Store } from '@ngrx/store';

import { ProfileEditState } from './store/profile-edit.reducer';
import { ProfileEditSet } from './store/profile-edit.actions';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
    public profileForm: FormGroup;
    url: string;
    defaultImage = '../../assets/avatarDefault.png';
    private pic;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<ProfileEditState>,
    ) {}

    ngOnInit(): void {
        this.pic = 'imageDefault';
        this.profileForm = this.formBuilder.group({
            userName: this.formBuilder.control('', [Validators.required]),
            userSurname: this.formBuilder.control('', [Validators.required]),
        });

        this.store.subscribe(state => console.log(state));

        this.store.dispatch(
            new ProfileEditSet({
                name: this.profileForm.get('userName').value,
                surName: this.profileForm.get('userSurname').value,
                avatar: this.pic,
            }),
        );
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
            }),
        );
    }
}
