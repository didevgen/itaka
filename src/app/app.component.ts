import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from '../app/components/auth/store/auth.actions';
import * as EditProfileActions from './components/profile-edit/store/profile-edit.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ita-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private userID: string;
    private subscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
        this.subscription = this.store.select('auth').subscribe(res => {
            if (!res.user) {
                return;
            }
            this.userID = res.user.id;
            if (this.userID) {
                this.store.dispatch(new EditProfileActions.ProfileEditUpdate());
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
