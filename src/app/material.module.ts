import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
} from '@angular/material';
=======
>>>>>>> d9f95a4af7b3566f1fdc90c2cdc242b7ef1b21b6
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
<<<<<<< HEAD
import { MatIconModule } from '@angular/material/icon';
=======
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
} from '@angular/material';

>>>>>>> d9f95a4af7b3566f1fdc90c2cdc242b7ef1b21b6
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
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
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
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
    ],
})
export class MaterialModule {}
