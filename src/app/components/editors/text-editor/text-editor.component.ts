import { Component, OnInit, OnDestroy } from '@angular/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { FormGroup, FormControl } from '@angular/forms';

import { UploadDataService } from 'src/app/services/upload-data.service';
@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnDestroy {
    public Editor = ClassicEditor;
    public config = Config;
    public uploadTextContentForm: FormGroup;
    public disabled: boolean;
    private disableTitle = true;
    private disableDescription = true;
    constructor(private uploadDataService: UploadDataService) {}
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

    public startUpload(data): void {
        this.uploadDataService.uploadTextData(data.title, data.description);
        this.disabled = true;
    }

    ngOnDestroy(): void {
        this.disabled = true;
    }
}
