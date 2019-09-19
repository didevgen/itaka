import { Injectable } from '@angular/core';
import { appReducer } from '../../../../itaka/src/app/store/app.reducer';
import {
    Subscription,
    Observable,
    Subject,
    of,
    BehaviorSubject,
    from,
} from 'rxjs';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
    multicast,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private db: AngularFirestore) {}
    searchByTitle(value) {
        console.log(this.db.collection('Posts'));
        this.db
            .collection('Posts')
            .get()
            .toPromise()
            .then(post => {
                post.docs.filter(
                    i =>
                        i
                            .data()
                            .title.toLowerCase()
                            .indexOf(value.toLowerCase()) >= 0,
                );
                console.log(
                    post.docs.filter(
                        i =>
                            i
                                .data()
                                .title.toLowerCase()
                                .indexOf(value.toLowerCase()) >= 0,
                    ),
                );
            });
    }
    searchByAuthorName(value) {
        console.log(this.db.collection('Users'));
        this.db
            .collection('Users')
            .get()
            .toPromise()
            .then(post => {
                post.docs.filter(
                    i =>
                        i
                            .data()
                            .title.toLowerCase()
                            .indexOf(value.toLowerCase()) >= 0,
                );
                console.log(
                    post.docs.filter(
                        i =>
                            i
                                .data()
                                .title.toLowerCase()
                                .indexOf(value.toLowerCase()) >= 0,
                    ),
                );
            });
    }
}
