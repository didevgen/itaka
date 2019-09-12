import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ita-cards-content-video',
    templateUrl: './cards-content-video.component.html',
    styleUrls: [
        './cards-content-video.component.scss',
        '../cards-container.component.scss',
    ],
})
export class CardsContentVideoComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    url: string;
    constructor() {}

    ngOnInit() {}
}
