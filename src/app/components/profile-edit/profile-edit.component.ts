import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
    public profileForm: FormGroup;
    url: string;
    defaultImage = '../../assets/avatarDefault.png';

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            userName: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [
                Validators.required,
                Validators.email,
            ]),
            password: this.formBuilder.control('', [Validators.required]),
            bio: this.formBuilder.control(''),
            skills: this.formBuilder.control(''),
            avatar: this.formBuilder.control(''),
        });
    }

    addAvatar(event) {
        const dialogRef = this.dialog.open(ModalDialogComponent, {
            height: '500px',
            width: '500px',
            data: event,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.url = result;
            this.profileForm.get('avatar').setValue(event.target.files[0]);
        });
    }

    getRawData(img: string): void {
        console.log(this.profileForm);
        console.log('src:', img);
    }
}
