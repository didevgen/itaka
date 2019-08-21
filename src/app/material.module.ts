import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

@NgModule({
    imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule],
    exports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule],
})
export class MaterialModule {}
