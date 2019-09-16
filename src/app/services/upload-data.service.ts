import { Injectable } from '@angular/core';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GetUserService } from './get-user.service';

@Injectable({
    providedIn: 'root',
})
export class UploadDataService {
    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
    ) {}

    uploadMediaData(
        title: string,
        description: string,
        contentType: string,
        url: string,
    ) {
        const userId = this.getUserService.getUserId();
        this.db.collection('Posts').add({
            url,
            date: new Date(),
            title,
            description,
            contentType,
            likes: 0,
            dislikes: 0,
            userId,
        });
    }

    uploadTextData(title: string, description: string) {
        const userId = this.getUserService.getUserId();
        this.db.collection('Posts').add({
            date: new Date(),
            title,
            description,
            contentType: 'text',
            likes: 0,
            dislikes: 0,
            userId,
        });
    }
}
