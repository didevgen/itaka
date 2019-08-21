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

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            bio: ['', Validators.required],
            skills: [''],
        });
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (urlEvent: any) => {
                // called once readAsDataURL is completed
                this.url = urlEvent.target.result;
            };
        }
    }
    getRawData() {
        console.log(this.profileForm); // get data from form
    }
}
