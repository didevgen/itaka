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

@Injectable({
    providedIn: 'root',
})
export class ProfileEditService implements OnDestroy {
    private subscription: Subscription;
    private data: EditProfile;
    private userID: string;
    public newUrl: string;
    public deletePreviousPath: any;
    public deletePath = ' ';

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private store: Store<AppState>,
        private userIdService: GetUserService,
    ) {}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    saveData(payload: EditProfile): Observable<EditProfile> {
        if (this.userIdService.getUserId()) {
            this.userID = this.userIdService.getUserId();
            this.data = payload;
            const document = this.db.doc('Users/' + this.userID);
            document.set({ ...this.data }, { merge: true }).catch(err => {
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
    setUrl(url: string, deletePreviousPath: string): any {
        console.log(url);
        console.log(deletePreviousPath);
        this.deletePreviousPath = deletePreviousPath;
        return (this.newUrl = url);
    }
    getUrl() {
        console.log(this.newUrl);
        return this.newUrl;
    }
    delPreviousUrl() {
        if (this.deletePath === ' ') {
            this.deletePath = this.deletePreviousPath;
            console.log('first if');
            console.log(this.deletePath);
            console.log(this.deletePreviousPath);
        } else if (this.deletePath !== this.deletePreviousPath) {
            const path = `${this.deletePath}`;
            // if (path === '') {return};
            console.log(path);
            const delRef = this.storage.ref(path);
            console.log(delRef);
            // Delete the file
            delRef
                .delete()
                .toPromise()
                .then(() => {
                    // File deleted successfully
                    console.log('del OK');
                })
                .catch(error => {
                    // Uh-oh, an error occurred!
                });
            this.deletePath = this.deletePreviousPath;
        } else {
            return;
        }
        // if ( this.deletePreviousUrl !== this.newUrl ) {
        //     console.log(this.deletePreviousUrl, "previous");
        //     console.log(this.newUrl, "new url")
        //     const path = `${this.deletePreviousUrl}`;
        //     //if (path === '') {return};
        //     console.log(path);
        //     let delRef = this.storage.ref(path);
        //     console.log(delRef);
        //     // Delete the file
        //     delRef.delete().toPromise().then(function() {
        //     // File deleted successfully
        //     console.log("del OK");
        //     }).catch(function(error) {
        //     // Uh-oh, an error occurred!
        //     });
        // } else {
        //     return console.log("Del not");
        // };
    }
}
