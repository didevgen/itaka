import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserService } from './get-user.service';
import { Like } from '../models/content/Likes/Likes.models';
import { OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LikesService implements OnDestroy {
    constructor(private db: AngularFirestore) {}

    saveDataLike(data: Like, postId: string): void {
        this.db
            .collection('Posts')
            .doc(postId)
            .ref.update({
                likes: firebase.firestore.FieldValue.arrayUnion({
                    userId: data.userId,
                    like: data.choiceStatus,
                }),
            });
    }

    saveDataDislike(data: Like, postId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .ref.update({
                dislikes: firebase.firestore.FieldValue.arrayUnion({
                    userId: data.userId,
                    like: data.choiceStatus,
                }),
            });
    }

    deleteDataLike(data: Like, postId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .ref.update({
                likes: firebase.firestore.FieldValue.arrayRemove({
                    userId: data.userId,
                    like: data.choiceStatus,
                }),
            });
    }

    deleteDataDislike(data: Like, postId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .ref.update({
                dislikes: firebase.firestore.FieldValue.arrayRemove({
                    userId: data.userId,
                    like: data.choiceStatus,
                }),
            });
    }

    getDataLikes(postId: string): Observable<any> {
        return this.db
            .collection('Posts')
            .doc(postId)
            .get();
    }

    getDataDislikes(postId: string): Observable<any> {
        return this.db
            .collection('Posts')
            .doc(postId)
            .get();
    }

    ngOnDestroy() {}
}
