import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { map, switchMap, tap } from 'rxjs/operators';

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
        const doc = this.db.doc('Users/' + this.userID++);
        doc.set({ ...this.data }).catch(err =>
            console.log('!!! error from promise in service: ', err),
        );
        return of(doc.get()).pipe(
            switchMap(info => {
                return info.pipe(map(val => val));
            }),
        );
        /*return from(
            this.db
                .collection('/Users')
                .doc('' + this.userID++)
                .set(
                    {
                        ...this.data,
                    },
                    { merge: true },
                ),
        );*/
    }
}
