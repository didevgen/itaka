import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ita-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
    isHovering: boolean;
    files: File[] = [];
    public uploadMediaForm: FormGroup;

    selectedContent: string = '';
    contentType: string[] = ['image', 'audio', 'video'];

    constructor() {
        this.uploadMediaForm = new FormGroup({
            content: new FormControl(),
            title: new FormControl(),
            description: new FormControl(),
            file: new FormControl(),
        });
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }
    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }
    selectedContentType(event) {
        this.selectedContent = event.value;
        console.log(this.selectedContent);
    }
}
