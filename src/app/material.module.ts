import { NgModule } from '@angular/core';
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
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
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
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
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
        MatProgressSpinnerModule
    ],
})
export class MaterialModule {}
