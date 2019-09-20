import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { GetUserService } from './get-user.service';

@Injectable({
    providedIn: 'root',
})
export class UploadDataService {
    private postId = this.db.createId();
    private userId = this.getUserService.getUserId();
    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
    ) {}

    public uploadMediaData(
        title: string,
        description: string,
        contentType: string,
        url: string,
    ): void {
        this.db
            .collection('Posts')
            .doc(this.postId)
            .set({
                url,
                date: new Date(),
                title,
                description,
                contentType,
                likes: 0,
                dislikes: 0,
                userId: this.userId,
                postId: this.postId,
            });
    }

    public uploadTextData(title: string, description: string): Observable<any> {
        const sendTextPromise = this.db
            .collection('Posts')
            .doc(this.postId)
            .set({
                date: new Date(),
                title,
                description,
                contentType: 'text',
                likes: 0,
                dislikes: 0,
                userId: this.userId,
                postId: this.postId,
            });
        const addText = from(sendTextPromise);
        return addText;
    }
}
