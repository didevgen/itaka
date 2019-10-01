import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-card-buttons',
    templateUrl: './card-buttons.component.html',
    styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent {
    constructor(private router: Router) {}

    isUserPage(): boolean {
        return this.router.url === '/userPage';
    }
}
