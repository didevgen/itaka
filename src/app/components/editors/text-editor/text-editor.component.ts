import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadDataService } from 'src/app/services/upload-data.service';

@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnDestroy {
    public Editor = ClassicEditor;
    public config: object = Config;
    public uploadTextContentForm: FormGroup;
    public disabled: boolean;
    private disableTitle: boolean = true;
    private disableDescription: boolean = true;
    constructor(
        private uploadDataService: UploadDataService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {}
    ngOnInit(): void {
        this.disabled = true;
        this.uploadTextContentForm = new FormGroup({
            title: new FormControl(),
            description: new FormControl(),
        });
    }
    public checkTitle(data): void {
        const { value } = data.target;
        !value ? (this.disableTitle = true) : (this.disableTitle = false);
        this.disableSendButton();
    }
    public checkDescription({ editor }): void {
        const data = editor.getData();
        data.length <= 400 || data.length >= 700
            ? (this.disableDescription = true)
            : (this.disableDescription = false);
        this.disableSendButton();
    }
    private disableSendButton(): void {
        this.disableTitle || this.disableDescription
            ? (this.disabled = true)
            : (this.disabled = false);
    }
    private redirect(): Promise<boolean> {
        return this.router.navigate(['userPage']);
    }
    private openSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 1500,
        });
    }
    public startUpload(data): void {
        this.disabled = true;
        this.uploadDataService
            .uploadTextData(data.title, data.description)
            .subscribe(
                response => {},
                error => this.openSnackBar(error),
                () => {
                    this.openSnackBar('Text added');
                    setTimeout(() => {
                        this.redirect();
                    }, 1500);
                },
            )
            .unsubscribe();
    }

    ngOnDestroy(): void {
        this.disabled = true;
    }
}
