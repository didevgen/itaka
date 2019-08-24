import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
    ],
    exports: [LoginComponent],
})
export class LoginModule {}
