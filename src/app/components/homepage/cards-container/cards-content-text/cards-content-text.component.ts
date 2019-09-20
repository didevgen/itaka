import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ita-cards-content-text',
    templateUrl: './cards-content-text.component.html',
    styleUrls: ['./cards-content-text.component.scss'],
})
export class CardsContentTextComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    description: string;

    constructor() {}

    ngOnInit() {}
}
