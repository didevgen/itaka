import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ita-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
    url: string;
    name: string;
    defaultImage = '../../assets/avatarDefault.png';

    constructor() {}

    ngOnInit() {}
}
