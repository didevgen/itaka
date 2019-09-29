import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserComment } from '../../../../models/content/comment.model';
import { GetUserService } from '../../../../shared/get-user.service';
import { EditProfile } from '../../../../models/edit-profile/edit-profile.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

    /* type SingleComment<UserComment> = {
      id: string | undefined,
      info: UserComment
    };
    comments: SingleComment[];*/
    isComment: boolean;
    commentFC: FormControl;
    date: string;
    userId: string;
    public userProfile: EditProfile;
    avatar: string;
    private destroy$ = new Subject<void>();
    defaultImage = '../../assets/avatarDefault.png';

    @ViewChild('comment', { static: false })
    comment: ElementRef;

    constructor(private userService: GetUserService) {}

    ngOnInit(): void {
        this.userId = this.userService.getUserId();
        this.userService
            .gerUserProfile(this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                profile => {
                    this.userProfile = profile;
                    console.log(this.userProfile, 'userProfile onInit');
                },
                err => console.error('error onInit subscribe ', err),
            );
        if (this.userProfile) {
            this.avatar = this.userProfile.avatar;
            console.log(this.avatar, 'avatar');
        }

        this.commentFC = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(400),
        ]);
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

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
        setTimeout(
            () => (this.comment.nativeElement.innerText = this.commentFC.value),
            0,
        );
    }
    onCancel() {
        this.isComment = false;
    }
    onDelete(singleComment) {
        singleComment.innerHTML = '';
    }
}
