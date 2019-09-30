import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth-form/auth-form.guard';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { TextEditorComponent } from './components/editors/text-editor/text-editor.component';
import { DragAndDropComponent } from './components/upload-media/drag-and-drop/drag-and-drop.component';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { CardContentDetailComponent } from './components/homepage/cards-container/card-content-detail/card-content-detail.component';
const routes: Routes = [
    { path: '', component: ContentContainerComponent },
    { path: 'admin', component: AdminContainerComponent },

    { path: 'editProfile', component: ProfileEditComponent },
    { path: 'userPage', component: UserPageComponent },
    {
        path: 'addText',
        component: TextEditorComponent,
        canActivate: [AuthGuard],
    },
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
    { path: 'cardDetail/:postId', component: CardContentDetailComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
