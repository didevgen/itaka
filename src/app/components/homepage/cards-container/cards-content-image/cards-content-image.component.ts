import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ita-cards-content-image',
    templateUrl: './cards-content-image.component.html',
    styleUrls: ['./cards-content-image.component.scss'],
})
export class CardsContentImageComponent implements OnInit {
    contentType: string;
    @Input()
    title: string;
    @Input()
    url: string;
    constructor() {}

    ngOnInit() {}
}
