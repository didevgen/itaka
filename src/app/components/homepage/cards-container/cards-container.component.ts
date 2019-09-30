import { Component, Input, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';

import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {
    Subscription,
    Observable,
    Subject,
    of,
    fromEvent,
    interval,
    timer,
} from 'rxjs';
import {
    map,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
} from 'rxjs/operators';
@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
    providers: [SearchService],
})
export class CardsContainerComponent implements OnInit, OnDestroy, DoCheck {
    media: Media[] = [];

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
                console.log(content);
            });

        console.log(
            this.searchService
                .getFoundData()
                .subscribe(e => console.log('cont', e)),
        );
    }
    ngDoCheck(): void {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
