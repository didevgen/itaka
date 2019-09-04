import { Component } from '@angular/core';

@Component({
    selector: 'ita-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent {
    isHovering: boolean;
    files: File[] = [];

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }
}
