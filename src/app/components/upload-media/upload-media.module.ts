import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMediaDirective } from './upload-media.directive';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UploadMediaDirective,
        DragAndDropComponent,
        ProgressBarComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [UploadMediaDirective, DragAndDropComponent, ProgressBarComponent],
})
export class UploadMediaModule {}
