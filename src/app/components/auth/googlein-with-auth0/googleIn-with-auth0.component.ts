import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'ita-googlein-with-auth0',
    templateUrl: './googleIn-with-auth0.component.html',
    styleUrls: ['./googleIn-with-auth0.component.css'],
})
export class GoogleInWithAuth0Component implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.localAuthSetup();
    }
}
