import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from './store/app.reducer';
import * as AuthActions from '../app/components/auth/store/auth.actions';
import * as EditProfileActions from './components/profile-edit/store/profile-edit.actions';

@Component({
    selector: 'ita-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(new AuthActions.AutoLogin());
        this.subscription = this.store
            .select(fromApp.getUser)
            .subscribe(user => {
                if (!user) {
                    return;
                }
                this.store.dispatch(new EditProfileActions.ProfileEditUpdate());
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
