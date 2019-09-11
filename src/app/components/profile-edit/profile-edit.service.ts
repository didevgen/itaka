import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { OnDestroy } from '@angular/core';

export class ProfileEditService implements OnDestroy {
    private subscription: Subscription;
    data: EditProfile;
    userID: any;

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
            this.subscription = this.store
                .select('auth')
                .subscribe(
                    ( res) => {
                      if (!res.user) {
                        return;
                      }
                      this.userID = res.user.id;
                    }
                );
        }

        const document = this.db.doc('Users/' + this.userID);
        document.set({ ...this.data }, { merge: true }).catch(err => {
            console.log('error from database while saving: ', err);
        });

        return of(this.data);
    }
}
