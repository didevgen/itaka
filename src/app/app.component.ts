import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from '../app/components/auth/store/auth.actions';

@Component({
    selector: 'ita-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
    }
}
