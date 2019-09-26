import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private db: AngularFirestore) {}
    searchByTitle(value: string) {
        // console.log(this.db.collection('Posts'));
        const searchTextPromise = this.db.collection('Posts').get();
        const search = from(searchTextPromise).pipe(
            map(posts => posts.docs),
            map(docs =>
                docs.filter(
                    post =>
                        post
                            .data()
                            .title.toLowerCase()
                            .indexOf(value.toLowerCase()) >= 0,
                ),
            ),
        );
        return search;
    }
}
