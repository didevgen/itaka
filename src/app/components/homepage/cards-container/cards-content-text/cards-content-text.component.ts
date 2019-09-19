import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
@Component({
    selector: 'ita-cards-content-text',
    templateUrl: './cards-content-text.component.html',
    styleUrls: ['./cards-content-text.component.scss'],
})
export class CardsContentTextComponent implements OnInit {
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    postId : string

    constructor(private store: Store<fromApp.AppState>){}

    ngOnInit() {}

    getPostId (elem) {
        this.store.dispatch(new LikesActions.GetPostId({postId:elem}))
      }
}
