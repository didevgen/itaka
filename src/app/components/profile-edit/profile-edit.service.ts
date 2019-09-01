import { HttpClient } from '@angular/common/http';
import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { Observable } from 'rxjs';

export class ProfileEditService {
    readonly requestURL = '';
    data: EditProfile;
    savedInfo: Observable<any>;

    constructor(private http: HttpClient) {}

    saveData(payload: EditProfile) {
        this.data = payload;
        this.savedInfo = this.http.post(
            this.requestURL + '/users',
            this.data.name,
        );
        return this.savedInfo;
    }
}
