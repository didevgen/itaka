import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Config } from './texteditor.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { GetUserIdService } from 'src/app/services/get-user-id.service';
@Component({
    selector: 'ita-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnDestroy {
    public Editor = ClassicEditor;
    public config = Config;
    public disabled: boolean;
    public title: string;
    public description = '';

    constructor(
        private db: AngularFirestore,
        private getUserIdService: GetUserIdService,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.disabled = false;
        console.log(this.disabled);
    }
    public send() {}
    public write({ data }) {
        console.log(data);
    }
    public onChange({ editor }) {
        const data = editor.getData();
        data.length > 100 ? console.log(data) : console.warn(data);
    }
    public startUpload(textContent) {
        console.log('send');
        setTimeout(() => {
            this.router.navigate(['userPage']);
        }, 2000);
        this.disabled = true;
        console.log(this.disabled);
        const { title, description } = textContent;
        const userId = this.getUserIdService.getUserId();
        this.db.collection('Posts').add({
            date: new Date(),
            title,
            description,
            contentType: 'text',
            userId,
        });
    }
    ngOnDestroy() {
        this.disabled = false;
        console.log(this.disabled);
    }
}
