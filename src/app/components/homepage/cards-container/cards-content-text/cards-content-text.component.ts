import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-text',
    templateUrl: './cards-content-text.component.html',
    styleUrls: ['./cards-content-text.component.scss'],
})
export class CardsContentTextComponent implements OnInit, OnDestroy {
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    postId: string;

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['/cardDetail', this.postId]);
    }

    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
