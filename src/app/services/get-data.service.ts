import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserService } from './get-user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Media } from '../models/content/Media/media.models';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GetDataService implements OnDestroy {
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
                        userMedia.push(posts);
                    }
                });
            });
    }

    renderCardContent(): Observable<any> {
        return this.db.collection('Posts').get();
    }

    filterMedia(media) {
        this.mediaSource.next(media);
    }

    ngOnDestroy(): void {}
}
