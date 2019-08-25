import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [NotFoundComponent],
})
export class NotFoundModule {}
