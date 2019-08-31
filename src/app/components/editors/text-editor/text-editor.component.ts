import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
    public model = {
        editorData: '<p>Hello, world!</p>',
    };
    public config = {
        extraPlugins: 'autogrow',

        autoGrow_minHeight: 200,
        autoGrow_maxHeight: 600,
        autoGrow_onStartup: true,
        toolbar: [['Bold', 'Italic', '', 'Font', 'Color']],

        language: 'en',
    };

    ngOnInit(): void {}
}
