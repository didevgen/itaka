import { Component, OnInit, Input } from '@angular/core';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GetUserIdService } from 'src/app/services/get-user-id.service';
@Component({
    selector: 'ita-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
    @Input()
    file: File;
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    contentType: string;

    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    urlOfUploadedFile: string;

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private getUserIdService: GetUserIdService,
    ) {}

    ngOnInit() {
        this.startUpload();
    }

    startUpload() {
        const userId = this.getUserIdService.getUserId();
        const path = `media/${Date.now()}_${this.file.name}`;
        const ref = this.storage.ref(path);
        //
        const newId = this.db.createId();
        //
        this.task = this.storage.upload(path, this.file);
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            tap(console.log),
            finalize(async () => {
                this.urlOfUploadedFile = await ref.getDownloadURL().toPromise();
                this.db
                    .collection('Posts')
                    .doc(newId)
                    .set({
                        url: this.urlOfUploadedFile,
                        date: new Date(),
                        title: this.title,
                        description: this.description,
                        contentType: this.contentType,
                        likes: 0,
                        dislikes: 0,
                        userId,
                        postId: newId,
                    });
            }),
        );
    }

    isActive(snapshot) {
        return (
            snapshot.state === 'running' &&
            snapshot.bytesTransferred < snapshot.totalBytes
        );
    }
}
