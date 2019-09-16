import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { GetUserIdService } from 'src/app/services/get-user-id.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private disableTitle: boolean = true;
    private disableDescription: boolean = true;
    constructor(
        private db: AngularFirestore,
        private getUserIdService: GetUserIdService,
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
    private checkTitle(data): void {
        const { value } = data.target;
        !value ? (this.disableTitle = true) : (this.disableTitle = false);
        this.disabling();
    }
    private checkDescription({ editor }): void {
        const data = editor.getData();
        data.length <= 400 || data.length >= 700
            ? (this.disableDescription = true)
            : (this.disableDescription = false);
        this.disabling();
    }
    private disabling(): void {
        this.disableTitle || this.disableDescription
            ? (this.disabled = true)
            : (this.disabled = false);
    }
    private redirect(): Promise<boolean> {
        return this.router.navigate(['userPage']);
    }
    public startUpload(data): void {
        const userId = this.getUserIdService.getUserId();
        this.db
            .collection('Posts')
            .add({
                date: new Date(),
                title: data.title,
                description: data.description,
                contentType: 'text',
                userId,
            })
            .then(_ => {
                this.openSnackBar('Text added');
                setTimeout(() => {
                    this.redirect();
                }, 2000);
            })
            .catch(err => this.openSnackBar(err));
    }
    openSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 1500,
        });
    }

    ngOnDestroy(): void {
        this.disabled = true;
    }
}
