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
// import { NavigationEnd, Router } from '@angular/router';
import { TextEditorComponent } from 'src/app/components/editors/text-editor/text-editor.component';
import { UploadDataService } from 'src/app/services/upload-data.service';

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
    private userSub: Subscription;
    private routeSubscription: Subscription;
    media: Media = new Object();
    postIdroute: string;
    private destroy$ = new Subject<void>();
    condition = false;
    titleCard: string;
    contentForEditting: string;
    public textEditorComponent: TextEditorComponent;

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
        // public router: Router,
        public uploadDataService: UploadDataService,
    ) {}

    ngOnInit(): void {
        this.userSub = this.store.select('likesCount').subscribe(like => {
            this.counterLike = Number(like.likes);
            this.counterDisl = Number(like.dislikes);
        });
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
        this.render(this.postIdroute);
        console.log(this.uploadDataService);
    }
    onLike() {
        this.store.dispatch(new LikesСounterActions.LikesLike());
    }

    onDisLike() {
        this.store.dispatch(new LikesСounterActions.LikeDislike());
    }

    render(postId) {
        this.getDataService
            .renderCardContent()
            .pipe(takeUntil(this.destroy$))
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (postId === doc.data().postId) {
                        const post = doc.data();
                        this.media = post;
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
    getEditor($event) {
        this.condition = true;
        this.titleCard = this.media.title;
        this.contentForEditting = this.media.description;
        this.uploadDataService.setTitleHeader(this.titleCard);
        this.uploadDataService.setContentForEditting(this.contentForEditting);
        this.uploadDataService.setPostIdroute(this.postIdroute);
        console.log(this.postIdroute);
        console.log(this.media.title);
        console.log(this.media.description);
    }
}
