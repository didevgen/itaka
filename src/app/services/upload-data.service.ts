import { Injectable } from '@angular/core';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root',
})
export class UploadDataService {
    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
        private router: Router,
        private snackBar: MatSnackBar,
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
        this.db
            .collection('Posts')
            .add({
                date: new Date(),
                title,
                description,
                contentType: 'text',
                likes: 0,
                dislikes: 0,
                userId,
            })
            .then(() => {
                this.openSnackBar('Text added');
                setTimeout(() => {
                    this.redirect();
                }, 2000);
            })
            .catch(err => this.openSnackBar(err));
    }
    private redirect(): Promise<boolean> {
        return this.router.navigate(['userPage']);
    }
    private openSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 1500,
        });
    }
}
