import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    private uName = '';
    isUserAuthenticated = true;
    constructor() {}
    getUserAvatar() {
        return '';
    }
    // set userName() {}
    get userName() {
        return this.uName;
    }
}
