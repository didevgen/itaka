import { Component, OnInit } from '@angular/core';
import { AuthService } from '../googlein-with-auth0/auth.service';

@Component({
    selector: 'ita-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.handleAuthCallback();
    }
}
