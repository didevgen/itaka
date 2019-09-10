import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'ita-submit-dialog',
    template: `
        <div mat-dialog-content>{{ data.message | uppercase }}</div>
    `,
    styleUrls: ['./submit-dialog.component.scss'],
})
export class SubmitDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<SubmitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
        setTimeout(() => this.dialogRef.close(), 1500);
    }
}
