import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
    selector: 'ita-cards-content-audio',
    templateUrl: './cards-content-audio.component.html',
    styleUrls: ['./cards-content-audio.component.scss'],
})
export class CardsContentAudioComponent implements OnInit, OnDestroy {
    @Input()
    title: string;
    @Input()
    url: string;
    count: number;
    @Output() @Input() postId: string;
    @Output() @Input() likes: number;
    @Output() @Input() dislikes: number;
    private userSub: Subscription;

    constructor(private db: AngularFirestore, private router: Router) {}

    ngOnInit() {}

    goCardDetail(elem) {
        this.router.navigate(['/cardDetail', this.postId]);
    }

    stopEvent(event) {
        event.stopPropagation();
    }

    ngOnDestroy() {}
}
