import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { EditProfile } from '../models/edit-profile/edit-profile.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

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
