import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCropperComponent } from 'ngx-image-cropper/src/component/image-cropper.component';

@Component({
    selector: 'ita-dialog-component',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['../profile-edit.component.scss'],
})
export class ModalDialogComponent {
    croppedImage: any = '';

    constructor(
        public dialogRef: MatDialogRef<ModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    imageCropped(image: any) {
        this.croppedImage = image.base64;
        // create canvas image instead base64????
        // this.ICC.getCanvasBlob(cropCanvas);
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
}
