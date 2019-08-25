import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../googlein-with-auth0/auth.service';

@Component({
    selector: 'ita-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
    public authForm: FormGroup;
    constructor(private formBuilder: FormBuilder, public auth: AuthService) {}

    ngOnInit() {
        this.authForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    getRawData() {
        console.log(this.authForm); // get data from form
    }
}
