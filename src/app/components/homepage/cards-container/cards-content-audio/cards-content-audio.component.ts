import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ita-cards-content-audio',
    templateUrl: './cards-content-audio.component.html',
    styleUrls: ['./cards-content-audio.component.scss'],
})
export class CardsContentAudioComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    url: string;
    constructor() {}

    ngOnInit() {}
}
