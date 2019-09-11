import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    Subscription,
    Observable,
    Subject,
    of,
    BehaviorSubject,
    from,
} from 'rxjs';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
    multicast,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    userName: string;
    avatar: string;
    isAuthenticated = false;
    private userSub: Subscription;
    private searchSubscription: Subscription;
    public inputSearch = new Subject<KeyboardEvent>();

    snapshot: Observable<any>;

    constructor(
        private store: Store<fromApp.AppState>,
        private db: AngularFirestore,
    ) {
        const sub = this.inputSearch;
        const searchInput = sub.pipe(
            map(event => event),
            debounceTime(300),
            distinctUntilChanged(),
            mergeMap(search => of(search).pipe(delay(500))),
        );

        searchInput.subscribe(t => console.log('input ==>', t));
        searchInput.subscribe(e => this.searchByTitle(e));
        searchInput.subscribe(e => this.searchByAuthorName(e));
    }
    getUserAvatar(): string {
        if (!this.avatar) {
            return 'url(\'../../assets/avatarDefault.png\')';
        } else {
            return `url(\'${this.avatar}\')`;
        }
    }

    ngOnInit() {
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isAuthenticated = !!user;
                console.log(!user);
                console.log(!!user);
            });
    }
    searchByTitle(value) {
        this.db
            .collection('Posts')
            .get()
            .toPromise()
            .then(post => {
                post.docs.filter(
                    i =>
                        i
                            .data()
                            .title.toLowerCase()
                            .indexOf(value.toLowerCase()) >= 0,
                );
                console.log(
                    post.docs.filter(
                        i =>
                            i
                                .data()
                                .title.toLowerCase()
                                .indexOf(value.toLowerCase()) >= 0,
                    ),
                );
            });
    }
    searchByAuthorName(value) {}
    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.searchSubscription.unsubscribe();
    }
}
