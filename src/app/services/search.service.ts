import { Injectable } from '@angular/core';
import { from, BehaviorSubject, Subject, of } from 'rxjs';
import {
    map,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    public currentSearchResponse = new Subject();

    constructor(private db: AngularFirestore) {}
    public shareFoundData(value) {
        this.currentSearchResponse.next(value);
        console.log('next', value);
    }
    public getFoundData() {
        // this.currentSearchResponse
        //     .asObservable()
        //     .subscribe(e => console.log(e));
        return this.currentSearchResponse.asObservable();
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
