import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { Observable, of, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../models/user/User.models';
import { catchError, map } from 'rxjs/operators';
import { GetUserService } from '../../services/get-user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProfileEditService implements OnDestroy {
    private subscription: Subscription;
    private data: EditProfile;
    private userID: string;
    public newUrl: string;
    public deletePreviousPath: string;
    public deletePath: any = ' ';

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private store: Store<AppState>,
        private userIdService: GetUserService,
        private http: HttpClient,
    ) {}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    saveData(payload: EditProfile): Observable<EditProfile> {
        if (this.userIdService.getUserId()) {
            this.userID = this.userIdService.getUserId();
            this.data = payload;
            const document = this.db.doc('Users/' + this.userID);
            document.update({ ...this.data }).catch(err => {
                console.log('error from database while saving: ', err);
            });

            return this.db
                .collection<User>('Users')
                .doc(this.userID)
                .valueChanges()
                .pipe(
                    map(val => val as EditProfile),
                    catchError(err => of(err)),
                );
        }
    }

    loadData(): Observable<EditProfile> {
        if (this.userIdService.getUserId()) {
            this.userID = this.userIdService.getUserId();

            return this.db
                .collection<User>('Users')
                .doc(this.userID)
                .valueChanges()
                .pipe(
                    map(val => val as EditProfile),
                    catchError(err => of(err)),
                );
        }
    }
    setUrl(url: string, deletePreviousPath: string): void {
        this.deletePreviousPath = deletePreviousPath;
        this.newUrl = url;
    }
    getUrl() {
        return this.newUrl;
    }
    delPreviousUrl(): void {
        if (this.deletePath !== this.deletePreviousPath) {
            const path = `${this.deletePath}`;
            const delRef = this.storage.ref(path);
            delRef
                .delete()
                .toPromise()
                .then(() => {})
                .catch(error => {});
            this.deletePath = this.deletePreviousPath;
        } else {
            return;
        }
    }
    updateUser(email, password) {
        return this.http.post(
            `${environment.urlAuthConfig.signIn}${environment.firebaseConfig.apiKey}`,
            {
                email,
                password,
                returnSecureToken: true,
            },
        );
    }
    deleteUser(idToken) {
        return this.http.post(
            `${environment.urlAuthConfig.deleteUser}${environment.firebaseConfig.apiKey}`,
            {
                idToken,
            },
        );
    }
}
