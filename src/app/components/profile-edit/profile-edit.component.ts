import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Component({
    selector: 'app-profile-edit',
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
            email: ['', Validators.required],
            password: ['', Validators.required],
            bio: ['', Validators.required],
            skills: [''],
            avatar: [''],
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

    getRawData(): void {
        console.log(this.profileForm);
    }
}
