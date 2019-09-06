import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Text } from '../../../models/content/Text/Text.models';
import { Config } from './texteditor.config';
import { ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
    private Editor = ClassicEditor;
    private config = Config;
    constructor(private db: AngularFirestore) {}
    ngOnInit(): void {}

    public startUpload(textContent: Text) {
        const { title, description } = textContent.text;
        console.log(title);
        console.log(description);

        this.db.collection('Posts').add({
            date: new Date(),
            title: title,
            description: description,
            contentType: 'text',
        });
    }

    isActive(snapshot) {
        return (
            snapshot.state === 'running' &&
            snapshot.bytesTransferred < snapshot.totalBytes
        );
    }
}
