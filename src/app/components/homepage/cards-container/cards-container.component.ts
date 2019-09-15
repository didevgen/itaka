import { Component, Input, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';

@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
    @Input() media: Media[];
    constructor() {}
    ngOnInit() {}
}
