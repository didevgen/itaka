import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
    public Editor = ClassicEditor;

    public model = {
        editorData: '',
    };
    public config = {
        toolbar: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'subscript',
            'superscript',
        ],

        language: 'en',
    };

    ngOnInit(): void {
        console.log(
            this.Editor.builtinPlugins.map(plugin => plugin.pluginName),
        );
    }
}
