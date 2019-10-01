import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-video',
    templateUrl: './cards-content-video.component.html',
    styleUrls: [
        './cards-content-video.component.scss',
        '../cards-container.component.scss',
    ],
})
export class CardsContentVideoComponent implements OnInit, OnDestroy {
    @Input()
    title: string;
    @Input()
    url: string;
    @Input()
    postId: string;

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['cardDetail', this.postId]);
    }

    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
