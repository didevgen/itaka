import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class SearchService {
    public currentSearchResponse = new Subject<[]>();

    constructor(private db: AngularFirestore) {}
    public shareFoundData(value) {
        this.currentSearchResponse.next(value);
    }

    public searchByTitle(value: string) {
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
            map(docs => docs.map(e => e.data())),
        );

        return search;
    }
}
