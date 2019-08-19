import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    public authForm: FormGroup
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.authForm = this.formBuilder.group({
            userName: ["", Validators.required],
            password: ["", Validators.required],
        })
    }
    getRawData() {
        console.log(this.authForm) // get data from form
    }
}
