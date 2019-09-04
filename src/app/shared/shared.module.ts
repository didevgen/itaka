import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [AlertComponent, PlaceholderDirective],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        PlaceholderDirective,
        CommonModule,
        MaterialModule,
    ],
    entryComponents: [AlertComponent],
})
export class SharedModule {}
