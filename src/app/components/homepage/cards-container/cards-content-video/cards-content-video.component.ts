import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-video',
    templateUrl: './cards-content-video.component.html',
    styleUrls: [
        './cards-content-video.component.scss',
        '../cards-container.component.scss',
    ],
})
export class CardsContentVideoComponent implements OnInit, OnDestroy {
    @Input()
    title: string;
    @Input()
    url: string;
    @Output() @Input() postId: string;
    @Output() @Input() likes: number;
    @Output() @Input() dislikes: number;
    constructor(private router: Router) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['cardDetail', this.postId]);
    }

    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
