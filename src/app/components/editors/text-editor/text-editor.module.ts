import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

@NgModule({
    declarations: [TextEditorComponent],
    exports: [TextEditorComponent],
    imports: [CommonModule, CKEditorModule, FormsModule, MaterialModule],
})
export class TextEditorModule {}
