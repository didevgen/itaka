import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCropperComponent } from 'ngx-image-cropper/src/component/image-cropper.component';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ProfileEditService } from '../profile-edit.service';

@Component({
    selector: 'ita-dialog-component',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['../profile-edit.component.scss'],
})
export class ModalDialogComponent {
    croppedImage: any = '';
    file: File;
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: any;
    downloadURL: string;
    deletePreviousPath: string;
    isDisabled = true;
    constructor(
        public dialogRef: MatDialogRef<ModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private profileEditService: ProfileEditService,
    ) {}

    imageCropped(image: any) {
        let uploadFileName = this.data.path[0].value;
        // console.dir(
        //     uploadFileName.slice(
        //         uploadFileName.lastIndexOf('\\') + 1,
        //         uploadFileName.length,
        //     ),
        // );
        // console.log(image);
        // dont touch
        uploadFileName = uploadFileName.slice(
            uploadFileName.lastIndexOf('\\') + 1,
            uploadFileName.length,
        );
        this.croppedImage = image.file;
        // dont touch
        this.file = new File([this.croppedImage], uploadFileName, {
            type: 'image/png',
        });
        // console.log(this.croppedImage instanceof Blob);
        // console.log(this.file);
        this.getUrl(this.file);
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    getUrl(file: File): any {
        const path = `media/${Date.now()}_${this.file.name}`;
        // console.log(path);
        const ref = this.storage.ref(path);
        // console.log(this.storage);
        console.log(ref);
        this.task = this.storage.upload(path, this.file);
        // console.log(this.task.snapshotChanges().subscribe());
        this.snapshot = this.task
            .snapshotChanges()
            .subscribe( async () => {
                console.log(typeof this.croppedImage);
                this.croppedImage = await ref.getDownloadURL().toPromise();
                this.deletePreviousPath = path;
                console.log(this.croppedImage);
                this.isDisabled = false;
                return this.profileEditService.setUrl(
                    this.croppedImage,
                    this.deletePreviousPath,
                );
            });
    }
}
