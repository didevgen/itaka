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

    constructor() {}

    ngOnInit(): void {}
    ngOnDestroy() {}

    toggleComment() {
        this.isOpenComment = !this.isOpenComment;
    }
    addDate(timeElem) {
        timeElem.dateTime = new Date().toString();
    }
}
