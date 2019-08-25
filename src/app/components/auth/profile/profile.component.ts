import { Component, OnInit } from '@angular/core';
import { AuthService } from '../googlein-with-auth0/auth.service';
@Component({
    selector: 'ita-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    constructor(public auth: AuthService) {}

    ngOnInit() {}
}
