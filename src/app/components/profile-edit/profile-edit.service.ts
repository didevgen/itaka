import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { find, map } from 'rxjs/operators';
import { User } from '../../models/user/User.models';

export class ProfileEditService {
    data: EditProfile;
    userID: string;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile): Observable<EditProfile> {
        this.data = payload;
        this.userID = '200 OK'; // should be user id from collection

        const docR = this.db.doc('Users/' + this.userID);
        docR.set({ ...this.data }, { merge: true }).catch(err => {
            console.log('error from promise in service to set fb data: ', err);
        });
        return this.db
            .collection<User>('Users')
            .valueChanges()
            .pipe(
                find(val => val === val[this.userID]),
                map(d => (d as unknown) as EditProfile),
            );
    }
}
