import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Comment } from '../../../../models/content/Text/comment.model';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { EditProfile } from '../../../../models/edit-profile/edit-profile.model';

@Injectable({
    providedIn: 'root',
})
export class CommentService implements OnDestroy {
    private destroy$ = new Subject<void>();
    private commentCollection: AngularFirestoreCollection<Comment>;
    defaultImage = '../../../../assets/avatarDefault.png';

    constructor(private db: AngularFirestore) {
        this.commentCollection = this.db.collection<Comment>('Comments');
    }

    public addComment(comment: Comment) {
        const postId = comment.postId;
        const userId = comment.userId;
        const commentId = this.db.createId();
        const userProfile: {
            name: string;
            avatar: string;
        } = { name: 'Noname', avatar: `${this.defaultImage}` };

        this.getProfile(userId)
            .pipe(
                map(user => user as EditProfile),
                takeUntil(this.destroy$),
            )
            .subscribe(user => {
                userProfile.name = user.name;
                userProfile.avatar = user.avatar;
                const fullComment: Comment = {
                    commentId,
                    userProfile,
                    ...comment,
                };
                this.commentCollection.doc(commentId).set(fullComment);
                this.commentIdToPostArray(postId, commentId);
            });
    }
    private getProfile(userID) {
        return this.db
            .collection('Users')
            .doc(userID)
            .valueChanges();
    }
    public removeComment(commentForDelete) {
        const commentID = commentForDelete.commentId;
        const postID = commentForDelete.postId;

        this.commentCollection.doc(commentID).delete();
        this.db
            .collection('Posts')
            .doc(postID)
            .update({
                commentsId: firebase.firestore.FieldValue.arrayRemove(
                    commentID,
                ),
            });
    }
    public getComments(postId: string): Array<any> | undefined {
        let commentIds = [];
        this.db
            .collection('Posts')
            .doc(postId)
            .valueChanges()
            .pipe(
                map(post => post),
                catchError(err => of(err)),
                takeUntil(this.destroy$),
            )
            .subscribe(
                post => {
                    if (post && post.commentsId) {
                        commentIds.length = 0;
                        commentIds.push(post.commentsId);
                    }
                },
                () => {
                    commentIds = [];
                    console.error(
                        `error on subscribe, comments id don't exist`,
                    );
                },
            );
        return commentIds;
    }
    private commentIdToPostArray(postId: string, commId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .update({
                commentsId: firebase.firestore.FieldValue.arrayUnion(commId),
            });
    }

    public commentsFromCollection(postId): Array<Comment> | undefined {
        const arrIds = this.getComments(postId);
        if (arrIds[0]) {
            return;
        }
        const comments: Array<Comment> = [];

        this.commentCollection
            .get()
            .pipe(takeUntil(this.destroy$))
            .subscribe(allCommentsId => {
                allCommentsId.docs.forEach(comment => {
                    if (arrIds[0]) {
                        if (
                            comment.id ===
                            arrIds[0].find(needId => needId === comment.id)
                        ) {
                            const oneComment = comment.data() as Comment;
                            comments.push(oneComment);
                        }
                    }
                });
            });
        return comments;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
