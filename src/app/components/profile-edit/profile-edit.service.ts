import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export class ProfileEditService {
    data: EditProfile;
    userID = 0;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile): Observable<EditProfile> {
        this.data = payload;
        let newDataForEffect: EditProfile;
        const docR = this.db.doc<EditProfile>('Users/' + this.userID++);
        docR.set({ ...this.data })
            .catch(err =>
                console.log(
                    '!!! error from promise in service to set fb data: ',
                    err,
                ),
            );
        newDataForEffect = this.data;
        return of(newDataForEffect);
    }
}
