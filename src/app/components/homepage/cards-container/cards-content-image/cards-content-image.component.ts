import { Component, OnInit, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
@Component({
    selector: 'ita-cards-content-image',
    templateUrl: './cards-content-image.component.html',
    styleUrls: ['./cards-content-image.component.scss'],
})
export class CardsContentImageComponent implements OnInit {
    contentType: string;
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
