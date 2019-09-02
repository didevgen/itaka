import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export class ProfileEditService {
    readonly requestURL = '';
    data: EditProfile;
    savedInfo: Observable<any>;

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile): Observable<any> {
        this.data = payload;
        /*this.savedInfo = this.http.post(
            this.requestURL + '/users',
            this.data.name,
        );
        // return this.savedInfo;
        return this.data;*/
        return from(
            this.db.collection('/Users').add({
                ...this.data,
            }),
        );
    }
}
