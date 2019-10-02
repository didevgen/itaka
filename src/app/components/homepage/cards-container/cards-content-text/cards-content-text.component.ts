import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-text',
    templateUrl: './cards-content-text.component.html',
    styleUrls: ['./cards-content-text.component.scss'],
})
export class CardsContentTextComponent implements OnInit, OnDestroy {
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    postId: string;
    @Output() @Input() likes: number;
    @Output() @Input() dislikes: number;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['/cardDetail', this.postId]);
        console.log('dis', this.dislikes);
        console.log('likes', this.likes);
    }

    getMarks() {}
    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
