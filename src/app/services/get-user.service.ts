import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, throwError } from 'rxjs';
import * as fromApp from '../store/app.reducer';

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
                    console.log(`the user doesn't exist yet (userID service)`);
                    return;
                }
                this.userID = user.id;
                this.isExisting = true;
            });
        if (this.isExisting) {
            return this.userID;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        fromApp.getUser.release();
    }
}
