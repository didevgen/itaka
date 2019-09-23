import { Component, OnDestroy, OnInit } from '@angular/core';
import { Media } from 'src/app/models/content/Media/media.models';
import { GetDataService } from 'src/app/services/get-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ita-user-cards-container',
    templateUrl: './user-cards-container.component.html',
    styleUrls: ['./user-cards-container.component.scss'],
})
export class UserCardsContainerComponent implements OnInit, OnDestroy {
    media: Media[] = [];
    private destroy$ = new Subject<void>();

    constructor(private getDataService: GetDataService) {}

    ngOnInit() {
        this.getDataService.currentMedia
            .pipe(takeUntil(this.destroy$))
            .subscribe(content => (this.media = content));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
