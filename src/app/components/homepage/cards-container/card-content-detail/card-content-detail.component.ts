import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {UserComment} from '../../../../models/content/comment.model';

@Component({
    selector: 'ita-card-content-detail',
    templateUrl: './card-content-detail.component.html',
    styleUrls: ['./card-content-detail.component.scss'],
})
export class CardContentDetailComponent implements OnInit {
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

    @ViewChild('comment', { static: false })
    comment: ElementRef;

    constructor() {}

    ngOnInit(): void {
        this.commentFC = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(400),
        ]);
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
