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
import { GetUserService } from '../../../../services/get-user.service';
import { LikesService } from '../../../../services/likes.service';

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
    // for counts from db
    counterLike: number;
    counterDisl: number;
    private userId: string;
    name: string;
    ava: string;

    userColorD: string;
    userColorL: string;

    // private flag: boolean = false

    private userSub: Subscription;
    private routeSubscription: Subscription;
    media: Media = new Object();
    postIdroute: string;
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store<fromApp.AppState>,
        private getDataService: GetDataService,
        private route: ActivatedRoute,
        private getUserService: GetUserService,
        private likesService: LikesService,
    ) {}

    ngOnInit(): void {
        // this.userSub = this.store.select('likesCount').subscribe(like => {
        //     // this.counterLike = Number(like.likes);
        //     console.log(like);
        //     // this.counterLike = like.countLikes;
        //     this.curStatusLike = like.likes;
        //     this.curStatusDisl = like.dislikes;
        // });
        this.routeSubscription = this.route.params.subscribe(
            params => (this.postIdroute = params.postId),
        );
        // this.render(this.postIdroute);
        this.renderData(this.postIdroute);
        this.renderDataLikes(this.postIdroute);
        this.renderDataDislikes(this.postIdroute);
    }
    onLike() {
        this.renderDataLikes(this.postIdroute);
        this.setLike();
    }

    onDisLike() {
        this.renderDataDislikes(this.postIdroute);
        this.setDislike();
    }

    setLike() {
        // if (!this.curStatusDisl) {
        //     this.curStatusDisl = !this.curStatusDisl
        //     this.userColorD = "base"
        //     this.LikesService.deleteDataDislike({
        //                 userId: this.getUserService.getUserId(),
        //                 choiceStatus: true
        //             },
        //             this.postIdroute
        //         );
        //         this.renderDataDislikes (this.postIdroute)
        // }

        if (this.checkDataDislike) {
            this.userColorL = 'base';
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
            console.log(this.curStatusLike);
            this.curStatusLike = !this.curStatusLike;
            console.log(this.curStatusLike);
            this.likesService.saveDataLike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorL = 'accent';
        } else {
            console.log('deleteDataLike', this.curStatusLike);
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
        // if (this.curStatusLike) {
        //     this.userColorL = "base"
        //     this.LikesService.deleteDataLike({
        //                 userId: this.getUserService.getUserId(),
        //                 choiceStatus: true
        //             },
        //             this.postIdroute
        //             );
        //     this.curStatusLike = !this.curStatusLike
        // }
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
            console.log(this.curStatusDisl);
            this.curStatusDisl = !this.curStatusDisl;
            console.log(this.curStatusDisl);
            this.likesService.saveDataDislike(
                {
                    userId: this.getUserService.getUserId(),
                    choiceStatus: true,
                },
                this.postIdroute,
            );
            this.userColorD = 'accent';
        } else {
            console.log('deleteDataDislike', this.curStatusDisl);
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
        this.getDataService.renderData().subscribe(snapshot => {
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

    renderDataLikes(postId: string) {
        this.likesService.getDataLikes(postId).subscribe(snapshot => {
            !snapshot.data().likes.length
                ? (this.counterLike = 0)
                : (this.counterLike = snapshot.data().likes.length);
        });
    }

    renderDataDislikes(postId: string) {
        this.likesService.getDataDislikes(postId).subscribe(snapshot => {
            !snapshot.data().dislikes.length
                ? (this.counterDisl = 0)
                : (this.counterDisl = snapshot.data().dislikes.length);
        });
    }

    checkDataLike(postId: string): boolean {
        this.likesService.getDataLikes(postId).subscribe(snapshot => {
            if (snapshot.data().userId) {
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
        this.curFlag = !this.curFlag;
        this.likesService.getDataDislikes(postId).subscribe(snapshot => {
            if (snapshot.data().userId) {
                if (
                    snapshot.data().userId === this.getUserService.getUserId()
                ) {
                    this.curFlag = true;
                }
            }
        });
        return this.curFlag;
    }

    ngOnDestroy() {
        // this.userSub.unsubscribe();
        this.routeSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
