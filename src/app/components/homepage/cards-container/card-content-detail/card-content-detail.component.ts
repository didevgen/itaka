import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
// import * as LikesСounterActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { GetDataService } from '../../../../services/get-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { Media } from '../../../../models/content/Media/media.models';
import { takeUntil } from 'rxjs/operators';
import { LikesService } from '../../../../services/likes.service';
import { TextEditorComponent } from 'src/app/components/editors/text-editor/text-editor.component';
import { UploadDataService } from 'src/app/services/upload-data.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { CommentService } from './comment.service';
import { Comment } from '../../../../models/content/Text/comment.model';
import { FormControl, Validators } from '@angular/forms';

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
    curStatusLike = false;
    curStatusDisl = false;
    private curFlag: boolean;
    counterLike: number;
    counterDisl: number;
    public userId: string;
    name: string;
    ava: string;
    userColorD: string;
    userColorL: string;
    private routeSubscription: Subscription;
    media: Media = new Object();
    postIdroute: string;
    private destroy$ = new Subject<void>();
    condition = false;
    titleCard: string;
    contentForEditting: string;
    public textEditorComponent: TextEditorComponent;

    isComment: boolean;
    commentFC: FormControl;
    date: string;
    currentUserProfile: { name: string; avatar: string };
    currentUserId: string;
    defaultImage = '../../../../assets/avatarDefault.png';

    private comment: Comment;
    public comments: Array<Comment> = [];

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
        private likesService: LikesService,
        public uploadDataService: UploadDataService,
        public getUserService: GetUserService,
        private currentUserIdService: GetUserService,
        private commentService: CommentService,
    ) {}

    ngOnInit(): void {
        this.store
            .select('auth')
            .pipe(takeUntil(this.destroy$))
            .subscribe(state => {
                if (!state.user) {
                    return;
                }
                this.currentUserId = state.user.id;
            });
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
        this.renderData(this.postIdroute);
        this.renderDataLikes(this.postIdroute);
        this.renderDataDislikes(this.postIdroute);
        this.getComments();
        this.commentFC = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(400),
        ]);
    }
    onLike() {
        if (this.getUserService.getUserId()) {
            this.renderDataLikes(this.postIdroute);
            this.setLike();
        }
    }

    onDisLike() {
        if (this.getUserService.getUserId()) {
            this.renderDataDislikes(this.postIdroute);
            this.setDislike();
        }
    }

    setLike() {
        if (this.checkDataDislike) {
            this.userColorD = 'base';
            this.likesService.deleteDataDislike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.renderDataDislikes(this.postIdroute);
        }

        if (!this.curStatusLike) {
            this.curStatusLike = !this.curStatusLike;
            this.likesService.saveDataLike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorL = 'accent';
        } else {
            this.likesService.deleteDataLike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorL = 'base';
            this.curStatusLike = false;
        }
    }

    setDislike() {
        if (this.checkDataLike) {
            this.userColorL = 'base';
            this.likesService.deleteDataLike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.renderDataLikes(this.postIdroute);
        }

        if (!this.curStatusDisl) {
            this.curStatusDisl = !this.curStatusDisl;
            this.likesService.saveDataDislike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorD = 'accent';
        } else {
            this.likesService.deleteDataDislike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorD = 'base';
            this.curStatusDisl = false;
        }
    }

    renderData(postId) {
        this.getDataService
            .renderCardData()
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
                        this.currentUserProfile = {
                            name: doc.data().name,
                            avatar: doc.data().avatar,
                        };
                    }
                });
            });
    }

    renderDataLikes(postId: string) {
        this.likesService.getDataLikes(postId).subscribe(snapshot => {
            if (snapshot.data()) {
                !snapshot.data().likes.length
                    ? (this.counterLike = 0)
                    : (this.counterLike = snapshot.data().likes.length);
            }
        });
    }

    renderDataDislikes(postId: string) {
        this.likesService.getDataDislikes(postId).subscribe(snapshot => {
            if (snapshot.data()) {
                !snapshot.data().dislikes.length
                    ? (this.counterDisl = 0)
                    : (this.counterDisl = snapshot.data().dislikes.length);
            }
        });
    }

    checkDataLike(postId: string): boolean {
        console.log('CheckDataLike', this.curFlag);
        this.likesService.getDataLikes(postId).subscribe(snapshot => {
            if (!!snapshot.data().userId) {
                if (
                    snapshot.data().userId === this.getUserService.getUserId()
                ) {
                    this.curFlag = true;
                }
            }
        });
        return this.curFlag;
    }

    checkDataDislike(postId: string): boolean {
        console.log('CheckDataDislike', this.curFlag);
        this.curFlag = !this.curFlag;
        this.likesService.getDataDislikes(postId).subscribe(snapshot => {
            if (!!snapshot.data().userId) {
                if (
                    snapshot.data().userId === this.getUserService.getUserId()
                ) {
                    this.curFlag = true;
                }
            }
        });
        return this.curFlag;
    }

    getEditor() {
        this.condition = true;
        this.titleCard = this.media.title;
        this.contentForEditting = this.media.description;
        this.uploadDataService.setTitleHeader(this.titleCard);
        this.uploadDataService.setContentForEditting(this.contentForEditting);
        this.uploadDataService.setPostIdroute(this.postIdroute);
    }

    isUserContent(): boolean {
        return this.getUserService.getUserId() === this.media.userId;
    }

    // forComments
    onSend() {
        this.isComment = true;
        this.date = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        this.comment = {
            text: this.commentFC.value,
            date: this.date,
            userId: this.currentUserId,
            postId: this.postIdroute,
        };
        this.commentService.addComment(this.comment);
        this.commentFC.reset();
        this.getComments();
    }
    onCancel() {
        this.commentFC.reset();
    }
    onDelete(commentForDelete) {
        this.commentService.removeComment(commentForDelete);
        this.getComments();
    }
    commentView() {
        this.isComment = !this.isComment;
    }
    private getComments() {
        this.comments = this.commentService.commentsFromCollection(
            this.postIdroute,
        );
        this.comments ? (this.isComment = true) : (this.isComment = false);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
