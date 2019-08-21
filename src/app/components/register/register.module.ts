import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
    exports: [RegisterComponent],
})
export class RegisterModule {}
