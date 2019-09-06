import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

@NgModule({
    declarations: [TextEditorComponent],
    exports: [TextEditorComponent],
    imports: [
        CommonModule,
        CKEditorModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
})
export class TextEditorModule {}
