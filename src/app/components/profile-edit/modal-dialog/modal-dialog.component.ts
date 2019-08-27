import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'ita-dialog-component',
    templateUrl: './modal-dialog.component.html',
})
export class ModalDialogComponent {
    croppedImage: any = '';

    constructor(
        public dialogRef: MatDialogRef<ModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    imageCropped(image: any) {
        this.croppedImage = image.base64;
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