import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

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
                    const items = doc.data();
                    media.push(items);
                });
            });
    }

    renderUserContent(): void {}
}
