import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesCounterActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { GetDataService } from '../../../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Media } from '../../../../models/content/Media/media.models';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { EditProfile } from '../../../../models/edit-profile/edit-profile.model';

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

    // forMyComment
    isComment: boolean;
    commentFC: FormControl;
    date: string;
    userId: string;
    public userProfile: EditProfile;
    avatar: string;
    // private destroy$ = new Subject<void>();
    defaultImage = '../../assets/avatarDefault.png';

    @ViewChild('comment', { static: false })
    comment: ElementRef;
    leftText: string;

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
        this.render(this.postIdroute);

        this.commentFC = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(400),
        ]);
    }
    onLike() {
        this.store.dispatch(new LikesCounterActions.LikesLike());
    }

    onDisLike() {
        this.store.dispatch(new LikesCounterActions.LikeDislike());
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
    // forMyComment
    onSend() {
        this.date = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        this.isComment = true;
        // this.leftText = this.commentFC.value;
        /*setTimeout(
            () => (this.comment.nativeElement.innerText = this.commentFC.value),
            0,
        );*/
    }
    onCancel() {
        this.isComment = false;
    }
    onDelete(singleComment) {
        singleComment.innerHTML = '';
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.routeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
