import { Component, OnDestroy, OnInit } from '@angular/core';
import { Media } from 'src/app/models/content/Media/media.models';
import { GetDataService } from 'src/app/services/get-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'ita-user-cards-container',
    templateUrl: './user-cards-container.component.html',
    styleUrls: ['./user-cards-container.component.scss'],
})
export class UserCardsContainerComponent implements OnInit, OnDestroy {
    public media: Media[] = [];
    private currentMedia: Media[] = [];
    private destroy$ = new Subject<void>();

    constructor(
        private getDataService: GetDataService,
        private searchService: SearchService,
    ) {}

    ngOnInit() {
        this.getDataService.currentMedia
            .pipe(takeUntil(this.destroy$))
            .subscribe(content => {
                this.media = content;
                this.currentMedia = content;
            });

        this.searchService.currentSearchResponse.subscribe(
            (foundData: Media[]) => {
                foundData === undefined ||
                foundData === [] ||
                foundData.length === this.currentMedia.length
                    ? (this.media = this.currentMedia)
                    : (this.media = foundData);
            },
        );
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
