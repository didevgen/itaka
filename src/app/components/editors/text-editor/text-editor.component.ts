import { Component, OnInit, OnDestroy } from '@angular/core';
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
    public config: any = Config;
    public uploadTextContentForm: FormGroup;
    public disabled: boolean;
    private disableTitle = true;
    private disableDescription = true;
    public titleHeader = '';
    public contentForEditting = '';
    public postIdroute: string;
    public button = 'Send';
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
        this.config.initialData = '';
        if (this.router.routerState.snapshot.url.includes('cardDetail')) {
            this.titleHeader = this.uploadDataService.getTitleHeader();
            this.contentForEditting = this.uploadDataService.getContentForEditting();
            this.config.initialData = this.contentForEditting;
            this.postIdroute = this.uploadDataService.getPostIdroute();
            if (this.titleHeader || this.contentForEditting) {
                this.button = 'Update';
            } else {
                return;
            }
        }
    }
    public checkTitle(data): void {
        const { value } = data.target;
        !value ? (this.disableTitle = true) : (this.disableTitle = false);
        this.disableSendButton();
    }
    public checkDescription({ editor }): void {
        const data = editor.getData();
        data.length <= 550 || data.length >= 2000
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
            duration: 1000,
        });
    }
    public startUpload(data): void {
        if (this.titleHeader || this.contentForEditting) {
            this.disabled = true;
            const downloadTextMethod = this.uploadDataService.updateTextData(
                data.title,
                data.description,
            );

            const downloadTextSubscription = downloadTextMethod.subscribe(
                response => {
                    console.log(response);
                },
                error => this.openSnackBar(error),
                () => {
                    this.openSnackBar('Text updated');
                    this.config.initialData = '';
                    setTimeout(() => {
                        this.redirect();
                        downloadTextSubscription.unsubscribe();
                    }, 1000);
                },
            );
        } else {
            this.disabled = true;
            const downloadTextMethod = this.uploadDataService.uploadTextData(
                data.title,
                data.description,
            );

            const downloadTextSubscription = downloadTextMethod.subscribe(
                response => {
                    console.log(response);
                },
                error => this.openSnackBar(error),
                () => {
                    this.openSnackBar('Text added');
                    setTimeout(() => {
                        this.redirect();
                        downloadTextSubscription.unsubscribe();
                    }, 1000);
                },
            );
        }
    }

    ngOnDestroy(): void {
        this.disabled = true;
    }
}
