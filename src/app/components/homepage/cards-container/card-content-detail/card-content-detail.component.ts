import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesСounterActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { GetDataService } from '../../../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Media } from '../../../../models/content/Media/media.models';
import { map, takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { EditProfile } from '../../../../models/edit-profile/edit-profile.model';
import { Comment } from '../../../../models/content/Text/comment.model';
import { GetUserService } from '../../../../services/get-user.service';
import { CommentService } from './comment.service';

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

    // forMyComment
    isComment: boolean;
    commentFC: FormControl;
    date: string;
    userProfile: { name: string; avatar: string };
    currentUserId: string;

    /*@ViewChild('comment', { static: false })
    comment: ElementRef;*/
    private comment: Comment;
    public comments: Array<Comment> = [];

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
        private currentUserIdService: GetUserService,
        private commentService: CommentService,
    ) {}

    ngOnInit(): void {
        this.currentUserId = this.currentUserIdService.getUserId();
        this.userSub = this.store.select('likesCount').subscribe(like => {
            this.counterLike = Number(like.likes);
            this.counterDisl = Number(like.dislikes);
        });
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
        this.renderData(this.postIdroute);

        this.commentFC = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(400),
        ]);
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
                    if (this.currentUserId === doc.id) {
                        this.userProfile = {
                            name: doc.data().name,
                            avatar: doc.data().avatar,
                        };
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

        this.comment = {
            text: this.commentFC.value,
            date: this.date,
            userId: this.currentUserId,
            postId: this.postIdroute,
        };
        this.commentService.addComment(this.comment);

        this.comments.push(this.comment);
        this.comments.reverse();
        // console.log(this.comment, 'comment onInit');
        // console.log(this.comments, 'commentSSS onInit');
        this.commentFC.reset();
    }
    onCancel() {
        this.commentFC.reset();
    }
    onDelete(deleteIndex) {
        this.comments.splice(deleteIndex, 1);
    }
    commentView() {
        this.isComment = !this.isComment;
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.routeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
