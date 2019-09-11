import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { OnDestroy } from '@angular/core';
import { User } from '../../models/user/User.models';
import { catchError, find, map } from 'rxjs/operators';

export class ProfileEditService implements OnDestroy {
    private subscription: Subscription;
    data: EditProfile;
    userID: string;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private store: Store<AppState>,
    ) {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    saveData(payload: EditProfile): Observable<EditProfile> {
        this.data = payload;
        if (!this.userID) {
            this.subscription = this.store.select('auth').subscribe(res => {
                if (!res.user) {
                    return;
                }
                this.userID = res.user.id;
            });
        }

        const document = this.db.doc('Users/' + this.userID);
        document.set({ ...this.data }, { merge: true }).catch(err => {
            console.log('error from database while saving: ', err);
        });

        return this.db
            .collection<User>('Users')
            .valueChanges()
            .pipe(
                find(val => val === val[this.userID]),
                map(d => (d as unknown) as EditProfile),
                catchError(err => of(err)),
            );
    }
}
