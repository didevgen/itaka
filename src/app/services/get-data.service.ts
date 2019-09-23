import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserService } from './get-user.service';
import { BehaviorSubject } from 'rxjs';
import { Media } from '../models/content/Media/media.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    private mediaSource = new BehaviorSubject<Media[]>([]);
    currentMedia = this.mediaSource.asObservable();
    private destroy$ = new Subject();

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

    renderCardContent(postId, curPost): void {
        this.db
            .collection('Posts')
            .get()
            .pipe(takeUntil(this.destroy$))
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
   
    ngOnDestroy(): void {
        this.destroy$.next(true);  
        this.destroy$.complete();
      }
 }
