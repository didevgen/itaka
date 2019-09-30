import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, Subject, of } from 'rxjs';
import {
    map,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
    switchMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as EditProfileActions from '../../profile-edit/store/profile-edit.actions';
import { SearchService } from '../../../services/search.service';
@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    inputSearch = new Subject<KeyboardEvent>();
    searchInput;
    avatar: string;
    private url: string | Blob;
    userName: string;
    isAuthenticated = false;
    private userSub: Subscription;
    snapshot: Observable<any>;

    constructor(
        private store: Store<fromApp.AppState>,
        private searchService: SearchService,
    ) {}
    getUserAvatar(): string {
        this.userSub = this.store.select('editProfile').subscribe(user => {
            this.url = user.avatar;
            this.userName = user.name;
        });
        if (!this.url) {
            return 'url(\'../../assets/avatarDefault.png\')';
        } else {
            return `url(\'${this.url}\')`;
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
    public setDesiredValue(value: KeyboardEvent) {
        this.inputSearch.next(value);
    }
    private onSearch() {
        this.searchInput = this.inputSearch.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            mergeMap((e: KeyboardEvent) => of(e).pipe(delay(500))),
        );

        this.searchInput
            .pipe(
                switchMap((query: string) =>
                    this.searchService.searchByTitle(query),
                ),
            )
            .subscribe((queryResult: []) =>
                this.searchService.shareFoundData(queryResult),
            );
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
        this.store.dispatch(new EditProfileActions.ProfileEditClear());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
        this.inputSearch.unsubscribe();
        this.searchInput.unsubscribe();
    }
}
