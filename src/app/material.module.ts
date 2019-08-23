import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule,MatProgressBarModule,MatProgressSpinnerModule],
    exports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule,MatProgressBarModule,MatProgressSpinnerModule],
})
export class MaterialModule {}
