import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
// import { AuthGuard } from './auth.guard';
import { AuthGuard } from '../app/components/auth/auth-form/auth-form.guard';
import { UploaderComponent } from './components/test-upload/uploader/uploader.component';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';

const routes: Routes = [
    { path: '', component: ContentContainerComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminContainerComponent },
    {
        path: 'uploadFile',
        component: UploaderComponent,
        canActivate: [AuthGuard],
    },
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
