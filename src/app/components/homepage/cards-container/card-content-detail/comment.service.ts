import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Comment } from '../../../../models/content/Text/comment.model';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommentService implements OnDestroy {
    private destroy$ = new Subject<void>();
    private commentCollection: AngularFirestoreCollection<Comment>;

    constructor(private db: AngularFirestore) {
        this.commentCollection = this.db.collection<Comment>('Comments');
    }

    public addComment(comment: Comment) {
        const postId = comment.postId;
        const commentId = this.db.createId();
        const fullComment: Comment = { commentId, ...comment };

        this.commentCollection.doc(commentId).set(fullComment);
        this.commentIdToPostArray(postId, commentId);
    }
    public getComments(postId: string): Array<Comment> | undefined {
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
                    if (post.commentsId) {
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
        console.log(commentIds, 'commentIds getComents service');
        return this.commentsFromCollection(commentIds);
        /*return commentIds.length
            ? this.commentsFromCollection(commentIds)
            : undefined;*/
    }

    private commentIdToPostArray(postId: string, commId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .update({
                commentsId: firebase.firestore.FieldValue.arrayUnion(commId),
            });
    }

    /*this.db
          .doc(`Posts/${postId}`)
          .snapshotChanges()
          .pipe(takeUntil(this.destroy$))
          .subscribe(post => {
              commentIds = post.payload.doc.data().commentsId;
              console.log(commentIds, 'commentIds from post');
          });*/

    /*tap(
              allCommentsId => {
                  comments = allCommentsId ;
                  debugger;
                  console.log(allCommentsId, 'allCommentsId');
              },
              (comments = allCommentsId.filter(
                      (val, ind, id) => id === neededIds.find(needId => needId === id),
                  )),
          ),*/
    private commentsFromCollection(
        neededIds: any[],
    ): Array<Comment> | undefined {
        const arrIds = neededIds;
        if (!arrIds) {
            return;
        }
        console.log(arrIds, 'neededIds arg');

        let comments: Array<Comment> = [];

        this.commentCollection
            .get()
            .pipe(takeUntil(this.destroy$))
            .subscribe(allCommentsId => {
                allCommentsId.docs.forEach(comment => {
                    if (
                        comment.id ===
                        arrIds[0].find(needId => needId === comment.id)
                    ) {
                        const oneComment = comment.data() as Comment;
                        comments.push(oneComment);
                    }
                });
                /*collection.docs.forEach(doc => {
              if (postId === doc.data().postId) {
                const post = doc.data();
                this.userId = doc.data().userId;
                this.media = post;
              }
            });*/
                // debugger;
                console.log(arrIds, 'neededIds subscribe');
                console.log(comments, 'comments');
                // return comments;
            });
        return comments;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
