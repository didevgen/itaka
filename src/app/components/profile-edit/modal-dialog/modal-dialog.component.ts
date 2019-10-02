import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProfileEditService } from '../profile-edit.service';

@Component({
    selector: 'ita-dialog-component',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['../profile-edit.component.scss'],
})
export class ModalDialogComponent {
    imageURL: string;
    image: string;

    croppedImage: string;
    file: File;
    task: AngularFireUploadTask;
    snapshot: any;
    deletePreviousPath: string;
    constructor(
        public dialogRef: MatDialogRef<ModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private storage: AngularFireStorage,
        private profileEditService: ProfileEditService,
    ) {}

    imageCropped(image: any) {
        let uploadFileName = this.data.path[0].value;
        uploadFileName = uploadFileName.slice(
            uploadFileName.lastIndexOf('\\') + 1,
            uploadFileName.length,
        );
        this.croppedImage = image.file;
        this.image = image;
        this.file = new File([this.croppedImage], uploadFileName, {
            type: 'image/png',
        });
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
    getUrl(): any {
        const path = `media/${Date.now()}_${this.file.name}`;
        const ref = this.storage.ref(path);
        this.task = this.storage.upload(path, this.file);
        this.snapshot = this.task.snapshotChanges().subscribe(async () => {
            this.imageURL = await ref.getDownloadURL().toPromise();
            this.deletePreviousPath = path;
            return this.profileEditService.setUrl(
                this.imageURL,
                this.deletePreviousPath,
            );
        });
    }
}
