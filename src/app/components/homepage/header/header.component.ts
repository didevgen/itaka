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
})
export class HeaderComponent implements OnInit, OnDestroy {
    userName: string;
    avatar: string;
    isAuthenticated = false;
    private userSub: Subscription;
    private searchSubscription: Subscription;
    public inputSearch = new Subject<KeyboardEvent>();
    public searchInput = new Observable();
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
        this.searchInput = sub.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            mergeMap(e => of(e).pipe(delay(500))),
        );
        const a = this.searchInput.subscribe(t => console.log('input ==>', t));
        this.searchInput.subscribe((e: string) => search.searchByTitle(e));
        this.searchInput.subscribe((e: string) => search.searchByAuthorName(e));
        // a.unsubscribe();
    }
    onSearch(event) {
        // console.log(event.target.value);
        // fromEvent(event.target.value, 'input')
        //     .pipe(
        //         map(event => event),
        //         debounceTime(500),
        //         distinctUntilChanged(),
        //         mergeMap(e => of(e).pipe(delay(500))),
        //     )
        //     .subscribe(e => console.log('ads', e));
    }
    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        // this.searchInput.unsubscribe();
    }
}
