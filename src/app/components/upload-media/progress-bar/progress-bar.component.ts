import { Component, OnInit, Input } from '@angular/core';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UploadDataService } from 'src/app/services/upload-data.service';
@Component({
    selector: 'ita-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
    @Input()
    private file: File;
    @Input()
    private title: string;
    @Input()
    private description: string;
    @Input()
    private contentType: string;

    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    urlOfUploadedFile: string;

    constructor(
        private storage: AngularFireStorage,
        private uploadDataService: UploadDataService,
    ) {}

    ngOnInit(): void {
        this.startUpload();
    }

    startUpload(): void {
        const path = `media/${Date.now()}_${this.file.name}`;
        const ref = this.storage.ref(path);
        this.task = this.storage.upload(path, this.file);
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            finalize(async () => {
                this.urlOfUploadedFile = await ref.getDownloadURL().toPromise();
                this.uploadDataService.uploadMediaData(
                    this.title,
                    this.description,
                    this.contentType,
                    this.urlOfUploadedFile,
                );
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
