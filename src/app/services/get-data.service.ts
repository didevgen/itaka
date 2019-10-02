import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserService } from './get-user.service';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Media } from '../models/content/Media/media.models';
import { forkJoin } from 'rxjs';

@Injectable()
export class GetDataService {
    private mediaSource = new BehaviorSubject<Media[]>([]);
    currentMedia = this.mediaSource.asObservable();

    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
    ) {}

    private getDataByDate(): Promise<any> {
        return this.db
            .collection('Posts')
            .ref.orderBy('date', 'desc')
            .get();
    }

    public render(media: Media[]): void {
        const getMedia = from(this.getDataByDate());
        const renderedMedia = getMedia.subscribe(snapshot => {
            snapshot.docs.forEach(doc => {
                const posts = doc.data();
                media.push(posts);
            });
            renderedMedia.unsubscribe();
            this.mediaSource.next(media);
        });
    }

    public renderUserContent(userMedia: Media[]): void {
        const userId = this.getUserService.getUserId();
        const getUserMedia = from(this.getDataByDate());
        const renderedUserMedia = getUserMedia.subscribe(snapshot => {
            snapshot.docs.forEach(doc => {
                if (userId === doc.data().userId) {
                    const posts = doc.data();
                    userMedia.push(posts);
                }
            });
            renderedUserMedia.unsubscribe();
            this.mediaSource.next(userMedia);
        });
    }

    renderCardData(): Observable<Array<any>> {
        const posts = this.db.collection('Posts').get();
        const users = this.db.collection('Users').get();
        const joinObservable = forkJoin(posts, users);
        return joinObservable;
    }

    filterMedia(media) {
        this.mediaSource.next(media);
    }
}
