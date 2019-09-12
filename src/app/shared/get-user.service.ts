import { Injectable, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class GetUserService implements OnDestroy {
    private userID: string;
    private subscription: Subscription;
    private isExisting: boolean;

    constructor(private store: Store<fromApp.AppState>) {
      this.isExisting = false;
    }

    getUserId(): string {
        this.subscription = this.store
            .select(fromApp.getUser)
            .subscribe(user => {
                if (!user) {
                    return;
                }
                this.userID = user.id;
                this.isExisting = true;
            });
        if (this.isExisting) {
            return this.userID;
        } else {
            return `user doesn't exist!`;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        fromApp.getUser.release();
    }
}
