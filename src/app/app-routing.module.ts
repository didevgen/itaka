import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../app/components/auth/register/register.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { UploaderComponent } from '../app/components/test-upload/uploader/uploader.component';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminContainerComponent },
    { path: 'uploadFile', component: UploaderComponent },
    { path: 'editProfile', component: ProfileEditComponent },
    { path: '**', component: NotFoundComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
