import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';

@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
    media: Media[] = [];

    constructor(private getDataService: GetDataService) {}

    ngOnInit() {
        this.render();
        this.renderUserContet();
    }

    render(): void {
        this.getDataService.render(this.media);
    }

    renderUserContet(): void {
        this.getDataService.renderUserContent();
    }
}
