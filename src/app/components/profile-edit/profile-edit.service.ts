import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export class ProfileEditService {
    data: EditProfile;
    userID = 0;

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile): Observable<any> {
        this.data = payload;

        return from(
            this.db
                .collection('/Users')
                .doc('' + this.userID++)
                .set({
                    ...this.data,
                }),
        );
    }
}
