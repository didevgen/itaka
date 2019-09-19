import { Component, OnInit, OnDestroy } from '@angular/core';
import { appReducer } from '../../../store/app.reducer';
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
                console.log(!user);
                console.log(!!user);
            });
        const sub = this.inputSearch;
        this.searchInput = sub.pipe(
            map(event => event),
            debounceTime(300),
            distinctUntilChanged(),
            mergeMap(e => of(e).pipe(delay(500))),
        );
        const a = this.searchInput.subscribe(t => console.log('input ==>', t));
        this.searchInput.subscribe(e => search.searchByTitle(e));
        this.searchInput.subscribe(e => search.searchByAuthorName(e));
        a.unsubscribe();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        // this.searchInput.unsubscribe();
    }
}
