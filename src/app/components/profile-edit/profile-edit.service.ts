import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export class ProfileEditService {
    data: EditProfile;
    userID: string;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile): Observable<any> {
        this.data = payload;
        this.userID = '200 OK'; // should be user id from collection

        const docR = this.db.doc('Users/' + this.userID);
        docR.set({ ...this.data }, { merge: true }).catch(err => {
            console.log('error from promise in service to set fb data: ', err);
        });
        return from(docR.get().forEach(d => d.data() as EditProfile));
    }
}
