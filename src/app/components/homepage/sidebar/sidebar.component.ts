import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'ita-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    media: Media[] = [];
    filteredMedia = this.media;
    activeType: string;
    selectedIcon = false;
    userPageUrl = '/userPage';
    private destroy$ = new Subject<void>();

    constructor(
        public router: Router,
        private getDataService: GetDataService,
    ) {}

    ngOnInit() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .pipe(takeUntil(this.destroy$))
            .subscribe((navEnd: NavigationEnd) => {
                this.media = [];
                this.filteredMedia = [];
                this.selectedIcon = false;
                navEnd.urlAfterRedirects === this.userPageUrl
                    ? this.getDataService.renderUserContent(this.media)
                    : this.getDataService.render(this.media);
            });
    }

    isAdminPage() {
        return this.router.url !== '/admin';
    }

    filterByContent(type) {
        this.selectedIcon = true;
        this.activeType = type;
        this.filteredMedia = [];
        this.media
            .filter(content => content.contentType === type)
            .map(result => this.filteredMedia.push(result));
        !type
            ? this.getDataService.filterMedia(this.media)
            : this.getDataService.filterMedia(this.filteredMedia);
        if (this.router.url !== this.userPageUrl) {
            this.router.navigate(['/']);
        }
    }

    isActive(type) {
        return this.activeType === type && this.selectedIcon;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
