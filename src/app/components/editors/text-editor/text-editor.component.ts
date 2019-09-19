import { Component, OnInit, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
import {
    Subscription,
    Observable,
    Subject,
    of,
    BehaviorSubject,
    from,
} from 'rxjs';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    mergeMap,
    delay,
    multicast,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
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
    private disabled = false;

    constructor(private db: AngularFirestore) {}
    ngOnInit(): void {}

    public startUpload(textContent) {
        const { title, description } = textContent;
        this.disabled = true;
        this.db.collection('Posts').add({
            date: new Date(),
            title,
            description,
            contentType: 'text',
        });
    }
}
