import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../app/components/auth/register/register.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { UploaderComponent } from '../app/components/test-upload/uploader/uploader.component';
import { UploadTaskComponent } from '../app/components/test-upload/upload-task/upload-task.component';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminContainerComponent },
  { path: 'uploadFile', component: UploaderComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
