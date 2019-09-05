import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth-form/auth-form.guard';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { DragAndDropComponent } from './components/upload-media/drag-and-drop/drag-and-drop.component';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';

const routes: Routes = [
    { path: '', component: ContentContainerComponent },
    { path: 'admin', component: AdminContainerComponent },
    {
        path: 'uploadMedia',
        component: DragAndDropComponent,
        canActivate: [AuthGuard],
    },
    { path: 'editProfile', component: ProfileEditComponent },
    { path: 'userPage', component: UserPageComponent },
    {
        path: 'editProfile',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'userPage',
        component: UserPageComponent,
        canActivate: [AuthGuard],
    },
    { path: 'auth', component: AuthFormComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
