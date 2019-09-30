import {
    Component,
    OnInit,
    OnDestroy,
    Output,
    DoCheck,
    Input,
} from '@angular/core';
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
    inputSearch = new Subject<KeyboardEvent>();
    searchService = new SearchService(this.db);
    searchInput;
    avatar: string;
    url: string | Blob;
    userName: string;
    isAuthenticated = false;
    private userSub: Subscription;

    snapshot: Observable<any>;

    constructor(
        private store: Store<fromApp.AppState>,
        private db: AngularFirestore,
    ) {}
    getUserAvatar(): string {
        this.userSub = this.store.select('editProfile').subscribe(user => {
            this.url = user.avatar;
            this.userName = user.name;
        });
        if (!this.url) {
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
            });

        this.onSearch();
    }

    private onSearch() {
        const inputSearch = this.inputSearch;
        this.searchInput = inputSearch.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            mergeMap(e => of(e).pipe(delay(500))),
        );
        this.searchInput.subscribe((query: string) =>
            this.searchService.searchByTitle(query).subscribe(queryResult => {
                console.log(queryResult);
                this.searchService.shareFoundData(queryResult);
            }),
        );
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.inputSearch.unsubscribe();
        this.searchInput.unsubscribe();
    }
}
