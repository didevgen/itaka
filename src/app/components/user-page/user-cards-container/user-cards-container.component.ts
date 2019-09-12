import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/content/Media/media.models';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
    selector: 'ita-user-cards-container',
    templateUrl: './user-cards-container.component.html',
    styleUrls: ['./user-cards-container.component.scss'],
})
export class UserCardsContainerComponent implements OnInit {
    media: Media[] = [];

    constructor(private getDataService: GetDataService) {}

    ngOnInit() {
        this.renderUserContent();
    }

    renderUserContent(): void {
        this.getDataService.renderUserContent(this.media);
    }
}
