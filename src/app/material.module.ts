import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatRippleModule,
        MatTooltipModule,
    ],
})
export class MaterialModule {}
