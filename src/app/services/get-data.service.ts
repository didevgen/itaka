import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserService } from './get-user.service';
import { BehaviorSubject } from 'rxjs';
import { Media } from '../models/content/Media/media.models';

@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    private posiId: string;
    private mediaSource = new BehaviorSubject<Media[]>([]);
    currentMedia = this.mediaSource.asObservable();

    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
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
                this.mediaSource.next(media);
            });
    }

    renderUserContent(userMedia): void {
        const userId = this.getUserService.getUserId();
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (userId === doc.data().userId) {
                        const posts = doc.data();
                        this.posiId = doc.data().postId;
                        userMedia.push(posts);
                    }
                });
            });
    }

    renderCardContent(postId, curPost): any {
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (postId === doc.data().postId) {
                        const post = doc.data();
                        Object.assign(curPost, post);
                    }
                });
            });
    }

    filterMedia(media) {
        this.mediaSource.next(media);
    }
}
