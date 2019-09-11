import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { UserCardsContainerComponent } from './user-cards-container/user-cards-container.component';
import { UserPageComponent } from './user-page.component';

@NgModule({
    declarations: [UserPageComponent, UserCardsContainerComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [UserPageComponent, UserCardsContainerComponent],
})
export class UserPageModule {}
