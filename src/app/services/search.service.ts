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
// import undefined = require('firebase/empty-import');

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private db: AngularFirestore) {}
    searchByTitle(value: string) {
        // console.log(this.db.collection('Posts'));
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
                                .indexOf(value.toLowerCase()) > -1,
                    ),
                );
            });
    }
    getAuthorId(name: string): string {
        // const names: Array<object>;
        // let users = this.db
        //     .collection('Users')
        //     .get()
        //     .toPromise()
        //     .then(user => {
        //         user.docs.filter(u =>
        //             u
        //                 .data()
        //                 .name.toLowerCase()
        //                 .indexOf(name.toLowerCase()),
        //         );
        //     })
        //     .then(e => (userId = e));
        console.log(`this.db.collection('Users').get()`);
        console.log(
            this.db
                .collection('Users')
                .get()
                .toPromise()
                .then(collection =>
                    collection.docs.filter(user => user.data().name === name),
                ),
        );
        return userId;
    }
    searchByAuthorName(name: string) {
        const userId = this.getAuthorId(name);
        console.log(userId);
        this.db
            .collection('Posts')
            .get()
            .toPromise()
            .then(post => {
                post.docs.filter(i => i.data().userId === userId);
            });
        console.log(
            this.db
                .collection('Posts')
                .get()
                .toPromise()
                .then(post => {
                    post.docs.filter(i => i.data().userId === userId);
                }),
        );
    }
}
