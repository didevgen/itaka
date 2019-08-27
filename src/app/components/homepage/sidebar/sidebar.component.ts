import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}

    isAdminPage() {
        return this.router.url !== '/admin';
    }
}
