import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Media } from '../models/content/Media/media.models';

@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    constructor(private db: AngularFirestore) {}
    render(media): void {
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    let items = doc.data();
                    media.push(items);
                });
            });
    }
}
