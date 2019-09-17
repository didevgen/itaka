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
    activeType: string;

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
        this.activeType = type;
        this.filteredMedia = [];
        this.media
            .filter(content => content.contentType === type)
            .map(result => this.filteredMedia.push(result));
        this.getDataService.filterMedia(this.filteredMedia);
    }
    isActive(type) {
        return this.activeType === type;
    }
}
