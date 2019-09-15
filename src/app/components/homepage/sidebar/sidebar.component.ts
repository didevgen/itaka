import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';

@Component({
    selector: 'ita-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    media: Media[] = [];
    filteredMedia = this.media;

    constructor(
        public router: Router,
        private getDataService: GetDataService,
    ) {}

    ngOnInit() {
        this.render();
    }

    isAdminPage() {
        return this.router.url !== '/admin';
    }

    render(): void {
        this.getDataService.render(this.media);
    }

    filterByContent(type) {
        this.filteredMedia = [];
        this.media.map((content, index) => {
            if (content.contentType === type) {
                this.filteredMedia.push(this.media[index]);
            }
        });
    }
}
