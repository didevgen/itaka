import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'ita-cards-content-image',
    templateUrl: './cards-content-image.component.html',
    styleUrls: ['./cards-content-image.component.scss'],
})
export class CardsContentImageComponent implements OnInit, OnDestroy {
    contentType: string;
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
