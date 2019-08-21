import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
    exports: [LoginComponent],
})
export class LoginModule {}
