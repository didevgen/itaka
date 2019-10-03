import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { GetUserService } from './get-user.service';

@Injectable()
export class UploadDataService {
    private userId = this.getUserService.getUserId();
    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
    ) {}
    private titleHeader: string;
    private contentForEditting: string;
    private postIdroute: string;

    public getTitleHeader() {
        return this.titleHeader;
    }
    public setTitleHeader(titleHeader: string) {
        this.titleHeader = titleHeader;
    }
    public getContentForEditting() {
        return this.contentForEditting;
    }
    public setContentForEditting(contentForEditting: string) {
        this.contentForEditting = contentForEditting;
    }
    public getPostIdroute() {
        return this.postIdroute;
    }
    public setPostIdroute(postIdroute: string) {
        this.postIdroute = postIdroute;
    }

    public uploadMediaData(
        title: string,
        description: string,
        contentType: string,
        url: string,
    ): void {
        const postId = this.db.createId();
        this.db
            .collection('Posts')
            .doc(postId)
            .set({
                url,
                date: new Date(),
                title,
                description,
                contentType,
                likes: [],
                dislikes: [],
                userId: this.userId,
                postId,
            });
    }

    public uploadTextData(title: string, description: string): Observable<any> {
        const postId = this.db.createId();
        const sendTextPromise = this.db
            .collection('Posts')
            .doc(postId)
            .set({
                date: new Date(),
                title,
                description,
                contentType: 'text',
                likes: [],
                dislikes: [],
                userId: this.userId,
                postId,
            });
        const addText = from(sendTextPromise);
        return addText;
    }
    public updateTextData(title: string, description: string): Observable<any> {
        const postId = this.postIdroute;
        const sendTextPromise = this.db
            .collection('Posts')
            .doc(postId)
            .set({
                date: new Date(),
                title,
                description,
                contentType: 'text',
                likes: [],
                dislikes: [],
                userId: this.userId,
                postId,
            });
        const addText = from(sendTextPromise);
        return addText;
    }
}
