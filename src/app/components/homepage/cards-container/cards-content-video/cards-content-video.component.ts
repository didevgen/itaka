import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
@Component({
    selector: 'ita-cards-content-video',
    templateUrl: './cards-content-video.component.html',
    styleUrls: [
        './cards-content-video.component.scss',
        '../cards-container.component.scss',
    ],
})
export class CardsContentVideoComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    url: string;
    @Input()
    postId: string;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {}

    getPostId(elem) {
        this.store.dispatch(new LikesActions.GetPostId({ postId: elem }));
    }
}
