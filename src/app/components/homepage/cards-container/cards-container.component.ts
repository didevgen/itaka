import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit, OnDestroy {
    public media: Media[] = [];
    private destroy$ = new Subject<void>();
    subscription: Subscription;
    constructor(
        private getDataService: GetDataService,
        private searchService: SearchService,
    ) {}

    ngOnInit() {
        this.getDataService.currentMedia
            .pipe(takeUntil(this.destroy$))
            .subscribe(content => {
                this.media = content;
            });

        this.searchService.currentSearchResponse.subscribe((e: []) => {
            e === undefined || e === []
                ? (this.media = this.media)
                : (this.media = e);
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.searchService.currentSearchResponse.unsubscribe();
    }
}
