import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
    public profileForm: FormGroup;
    url: string;
    defaultImage = '../../assets/avatarDefault.png';

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            bio: ['', Validators.required],
            skills: [''],
            avatar: [''],
        });
    }

    addAvatar(event): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (urlEvent: any) => {
                this.url = urlEvent.target.result;
                this.profileForm.get('avatar').setValue(event.target.files[0]);
            };
        }
    }

    getRawData(): void {
        const formData = new FormData();
        formData.append('email', this.profileForm.get('email').value);
        formData.append('file', this.profileForm.get('avatar').value);
        formData.append('password', this.profileForm.get('password').value);
        formData.append('bio', this.profileForm.get('bio').value);
        formData.append('avatar', this.profileForm.get('avatar').value);
    }
}
