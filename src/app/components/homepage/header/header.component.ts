import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    value = 'Clear me';
    constructor() {}

    ngOnInit() {}
}
