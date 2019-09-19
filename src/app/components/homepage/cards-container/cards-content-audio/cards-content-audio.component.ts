import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../store/app.reducer';
import * as LikesActions from '../../cards-container/card-content-detail/store/card-content.actions';
import { AngularFirestore } from 'angularfire2/firestore';
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
    count :number;
    @Input()
    postId : string;
    private userSub: Subscription; 
    constructor(private store: Store<fromApp.AppState>,private db: AngularFirestore) {}

    ngOnInit() {
        this.userSub = this.store
        .select('likesCount')
        .subscribe(like => {
            console.log(like)
            this.count = +like.likes
        });
    }
    
    getPostId (elem) {
        this.store.dispatch(new LikesActions.GetPostId({postId:elem}))
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}
