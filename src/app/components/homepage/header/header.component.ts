import { Component, OnInit, OnDestroy } from '@angular/core';
import { appReducer } from '../../../store/app.reducer';
import { Subscription, Observable, Subject, of, fromEvent } from 'rxjs';
import {
    map,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { SearchService } from '../../../services/search.service';
@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [SearchService],
})
export class HeaderComponent implements OnInit, OnDestroy {
    userName: string;
    avatar: string;
    isAuthenticated = false;
    private userSub: Subscription;
    private searchSubscription: Subscription;
    public inputSearch = new Subject<KeyboardEvent>();
    public searchInput;
    snapshot: Observable<any>;

    constructor(
        private store: Store<fromApp.AppState>,
        private db: AngularFirestore,
    ) {}
    getUserAvatar(): string {
        if (!this.avatar) {
            return 'url(\'../../assets/avatarDefault.png\')';
        } else {
            return `url(\'${this.avatar}\')`;
        }
    }

    ngOnInit() {
        const search = new SearchService(this.db);
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                this.isAuthenticated = !!user;
            });
        const sub = this.inputSearch;
        this.onSearch(sub, search);
    }

    private onSearch(sub: Subject<KeyboardEvent>, search: SearchService) {
        this.searchInput = sub.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            mergeMap(e => of(e).pipe(delay(500))),
        );
        this.searchInput.subscribe((element: string) =>
            search
                .searchByTitle(element)
                .subscribe(posts =>
                    console.log(posts.map(post => post.data().title)),
                ),
        );
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.inputSearch.unsubscribe();
    }
}
