import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
    public authForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.authForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
    getRawData() {
        console.log(this.authForm); // get data from form
    }
}
