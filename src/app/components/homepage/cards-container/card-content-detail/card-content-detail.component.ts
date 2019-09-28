import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesСounterActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { GetDataService } from '../../../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Media } from '../../../../models/content/Media/media.models';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ita-card-content-detail',
    templateUrl: './card-content-detail.component.html',
    styleUrls: ['./card-content-detail.component.scss'],
})
export class CardContentDetailComponent implements OnInit, OnDestroy {
    title: string;
    description: string;
    url: string;
    type: string;
    counterLike: number;
    counterDisl: number;
    private userId: string;
    name: string;
    ava: string;
    private userSub: Subscription;
    private routeSubscription: Subscription;
    media: Media = new Object();
    postIdroute: string;
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.userSub = this.store.select('likesCount').subscribe(like => {
            this.counterLike = Number(like.likes);
            this.counterDisl = Number(like.dislikes);
        });
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
        this.renderData(this.postIdroute);
    }
    onLike() {
        this.store.dispatch(new LikesСounterActions.LikesLike());
    }

    onDisLike() {
        this.store.dispatch(new LikesСounterActions.LikeDislike());
    }

    renderData(postId) {
        this.getDataService
            .renderData()
            .pipe(takeUntil(this.destroy$))
            .subscribe(snapshot => {
                snapshot[0].docs.forEach(doc => {
                    if (postId === doc.data().postId) {
                        const post = doc.data();
                        this.userId = doc.data().userId;
                        this.media = post;
                    }
                });
                snapshot[1].docs.forEach(doc => {
                    if (this.userId === doc.id) {
                        this.name = doc.data().name;
                        this.ava = doc.data().avatar;
                    }
                });
            });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.routeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
