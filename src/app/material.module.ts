import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatDividerModule,
        MatMenuModule,
        MatTabsModule,
        MatExpansionModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatDividerModule,
        MatMenuModule,
        MatTabsModule,
        MatExpansionModule,
    ],
})
export class MaterialModule {}
