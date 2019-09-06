import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { Observable } from 'rxjs';

export class ProfileEditService {
    data: Observable<EditProfile>;
    savedInfo: Observable<any>;

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
    ) {}

    saveData(payload: EditProfile) {
        const payld = payload;
        debugger;
        this.data = this.http.post<EditProfile>(this.requestURL, { ...payld });
        return this.data;
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
