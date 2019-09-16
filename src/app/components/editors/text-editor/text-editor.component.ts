import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { GetUserService } from 'src/app/services/get-user.service';
import { UploadDataService } from 'src/app/services/upload-data.service';
@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
    public Editor = ClassicEditor;
    public config = Config;
    public title: string;
    public description: string;

    constructor(private uploadDataService: UploadDataService) {}
    ngOnInit(): void {}

    public startUpload(textContent) {
        const { title, description } = textContent;
        this.uploadDataService.uploadTextData(title, description);
    }
}
