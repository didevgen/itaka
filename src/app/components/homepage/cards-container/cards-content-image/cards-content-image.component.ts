import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-image',
    templateUrl: './cards-content-image.component.html',
    styleUrls: ['./cards-content-image.component.scss'],
})
export class CardsContentImageComponent implements OnInit, OnDestroy {
    contentType: string;
    @Input()
    title: string;
    @Input()
    url: string;
    @Input()
    postId: string;
    @Output() @Input() likes: number;
    @Output() @Input() dislikes: number;
    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['cardDetail', this.postId]);
        console.log('dis', this.dislikes);
        console.log('likes', this.likes);
        // this.setPostId(elem);
    }

    // setPostId(elem) {
    //     this.store.dispatch(new LikesActions.GetPostId({ postId: elem }));
    // }

    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
