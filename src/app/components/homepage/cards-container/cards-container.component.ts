import { Component, Input, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';

@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
    media: Media[];
    constructor(private getDataService: GetDataService) {}

    ngOnInit() {
        this.getDataService.currentMedia.subscribe(
            message => (this.media = message),
        );
    }
}
