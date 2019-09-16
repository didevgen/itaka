import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { GetUserService } from 'src/app/services/get-user.service';
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
    constructor(
        private db: AngularFirestore,
        private getUserService: GetUserService,
    ) {}
    ngOnInit(): void {}

    public startUpload(textContent) {
        const { title, description } = textContent;
        const userId = this.getUserService.getUserId();
        this.db.collection('Posts').add({
            date: new Date(),
            title,
            description,
            contentType: 'text',
            userId,
            likes: 0,
            dislikes: 0,
        });
    }
}
