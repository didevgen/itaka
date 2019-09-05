import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Text } from '../../../models/content/Text/Text.models';
import { Config } from './texteditor.config';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
    private Editor = ClassicEditor;
    private config = Config;
    textContent: Text;

    constructor() {}

    ngOnInit(): void {}

    public onChange({ editor }: ChangeEvent) {
        setTimeout(() => {
            const data = editor.getData();
            console.log(data);
        }, 700);
    }
    getTextContent(textContent: Text) {
        console.log(textContent);
    }
}
