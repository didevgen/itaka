import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { find, map } from 'rxjs/operators';
import { User } from '../../models/user/User.models';

export class ProfileEditService {
<<<<<<< HEAD
    data: Observable<EditProfile>;
    savedInfo: Observable<any>;

    constructor(
        private http: HttpClient,
=======
    data: EditProfile;
    userID: string;

    constructor(
>>>>>>> 080b28203016d9f24cfbed1623ad06f9af0a281e
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

<<<<<<< HEAD
    saveData(payload: EditProfile) {
        const payld = payload;
        debugger;
        this.data = this.http.post<EditProfile>(this.requestURL, { ...payld });
        return this.data;
=======
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
>>>>>>> 080b28203016d9f24cfbed1623ad06f9af0a281e
    }

    // saveImage(blob: Blob) {
    //     const dataBlob: Blob = blob;
    //     this.savedInfo = this.http.post(
    //         this.requestURL + '/users',
    //         dataBlob,
    //     );
    //     return this.savedInfo;
    // }
}
