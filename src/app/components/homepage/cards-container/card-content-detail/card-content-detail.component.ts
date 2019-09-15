import { Component, OnInit, OnDestroy, Output } from '@angular/core';

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
    isOpenComment = false;
    date: string;
    myForm: FormData;

    constructor() {}

    ngOnInit(): void {
        this.myForm = new FormData();
    }
    ngOnDestroy() {}

    toggleComment() {
        this.isOpenComment = !this.isOpenComment;
    }
    addDate() {
        this.date = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    }
}
