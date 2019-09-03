import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { DragAndDropComponent } from './components/upload-media/drag-and-drop/drag-and-drop.component';

const routes: Routes = [
    { path: '', component: ContentContainerComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminContainerComponent },
    { path: 'uploadMedia', component: DragAndDropComponent },
    { path: 'editProfile', component: ProfileEditComponent },
    { path: 'userPage', component: UserPageComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
