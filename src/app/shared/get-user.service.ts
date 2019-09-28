import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, throwError } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { User } from '../models/user/User.models';
import { map } from 'rxjs/operators';
import { EditProfile } from '../models/edit-profile/edit-profile.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class GetUserService implements OnDestroy {
    private userID: string;
    private subscription: Subscription;
    private isExisting: boolean;

    constructor(
        private store: Store<fromApp.AppState>,
        private db: AngularFirestore,
    ) {
        this.isExisting = false;
    }

    getUserId(): string {
        this.subscription = this.store
            .select(fromApp.getUser)
            .subscribe(user => {
                if (!user) {
                    console.log(`the user doesn't exist yet`);
                    return;
                }
                this.userID = user.id;
                this.isExisting = true;
            });
        if (this.isExisting) {
            return this.userID;
        } else {
            throwError(`user doesn't exist! (from service)`);
        }
    }

    gerUserProfile(id): Observable<EditProfile> {
        return this.db
            .collection<User>('Users')
            .doc(id)
            .valueChanges()
            .pipe(
                map(
                    val => val as EditProfile,
                    throwError('error in service getUserProfile'),
                ),
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        fromApp.getUser.release();
    }
}
