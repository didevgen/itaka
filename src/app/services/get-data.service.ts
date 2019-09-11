import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserIdService } from './get-user-id.service';

@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    constructor(
        private db: AngularFirestore,
        private getUserIdService: GetUserIdService,
    ) {}
    render(media): void {
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    const posts = doc.data();
                    media.push(posts);
                });
            });
    }

    renderUserContent(userMedia): void {
        const userId = this.getUserIdService.getUserId();
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (userId === doc.data().userId) {
                        const posts = doc.data();
                        userMedia.push(posts);
                    }
                });
            });
    }
}
