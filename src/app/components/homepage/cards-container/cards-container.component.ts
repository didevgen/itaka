import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetDataService } from '../../../services/get-data.service';
import { Media } from '../../../models/content/Media/media.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ita-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit, OnDestroy {
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
