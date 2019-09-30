import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ita-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
    public isHovering: boolean;
    public files: File[] = [];
    public uploadMediaForm: FormGroup;

    public selectedContent = 'image';
    public contentType: string[] = ['image', 'audio', 'video'];

    ngOnInit() {
        this.uploadMediaForm = new FormGroup({
            title: new FormControl(),
            description: new FormControl(),
            file: new FormControl(),
        });
    }

    public toggleHover(event: boolean): void {
        this.isHovering = event;
    }
    public onDrop(files: FileList): void {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }
    public selectedContentType(event): void {
        this.selectedContent = event.value;
    }
}
