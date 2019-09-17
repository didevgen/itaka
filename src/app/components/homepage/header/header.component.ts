import { Component, OnInit, OnDestroy } from '@angular/core';
// add for auth
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as EditProfileActions from '../../profile-edit/store/profile-edit.actions';

@Component({
    selector: 'ita-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    value = 'Clear me';
    userName: string;
    avatar: string;
    isAuthenticated = false;
    private userSub: Subscription;
    private url: any;
    constructor(private store: Store<fromApp.AppState>) {}
    getUserAvatar(): string {
        this.userSub = this.store.select('editProfile').subscribe(user => {
            return this.url = user.avatar;
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
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
        this.store.dispatch(new EditProfileActions.ProfileEditClear());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
