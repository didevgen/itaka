import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Comment } from '../../../../models/content/Text/comment.model';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private commentCollection: AngularFirestoreCollection<Comment>;

    constructor(private db: AngularFirestore) {
        this.commentCollection = this.db.collection<Comment>('Comments');
    }

    addComment(comment: Comment) {
        const postId = comment.postId;
        const commentId = this.db.createId();
        const fullComment: Comment = { commentId, ...comment };
        this.commentCollection.doc(commentId).set(fullComment);

        this.commentIdToPostArray(postId, commentId);
    }

    private commentIdToPostArray(postId: string, commId: string) {
        this.db
            .collection('Posts')
            .doc(postId)
            .update({ commentsId: [commId] });
    }
}
