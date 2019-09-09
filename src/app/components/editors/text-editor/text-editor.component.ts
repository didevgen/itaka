import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
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
    constructor(private db: AngularFirestore) {}
    ngOnInit(): void {}

    public startUpload(textContent) {
        const { title, description } = textContent;

        this.db.collection('Posts').add({
            date: new Date(),
            title,
            description,
            contentType: 'text',
        });
    }
}
