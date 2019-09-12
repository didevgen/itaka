import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GetUserIdService {
    constructor(private store: Store<fromApp.AppState>) {}

    getUserId() {
        let userId = '';
        this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                userId = user.id;
            });
        return userId;
    }
}
