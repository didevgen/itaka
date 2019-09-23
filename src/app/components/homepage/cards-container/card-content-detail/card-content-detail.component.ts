import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesounterActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { GetDataService } from '../../../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Media } from '../../../../models/content/Media/media.models';

@Component({
    selector: 'ita-card-content-detail',
    templateUrl: './card-content-detail.component.html',
    styleUrls: ['./card-content-detail.component.scss'],
})
export class CardContentDetailComponent implements OnInit, OnDestroy {
    title: string;
    postId: string;
    description: string;
    url: string;
    type: string;
    counterLike: number;
    counterDisl: number;
    private userSub: Subscription;
    private routeSubscription: Subscription;
    media: Media = new Object()
    postIdroute: string;

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
        )
    {
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
    }

    ngOnInit(): void {
        this.userSub = this.store.select('likesCount').subscribe(like => {
            console.log('PostId detail from store', like.postId);
            this.counterLike = +like.likes;
            this.counterDisl = +like.dislikes;
        });
    this.render (this.postIdroute)
      
}
    onLike() {
        this.store.dispatch(new LikesounterActions.LikesLike());
        console.log('Get post id', this.postIdroute);
    }

    onDisLike() {
        this.store.dispatch(new LikesounterActions.LikeDislike());
    }

    render(postId) {
        this.getDataService.renderCardContent(postId, this.media);
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
}
