import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { DropzoneDirective } from '../app/components/test-upload/upload.directive';
import { UploaderComponent } from '../app/components/test-upload/uploader/uploader.component';
import { UploadTaskComponent } from '../app/components/test-upload/upload-task/upload-task.component';
import {environment} from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminModule } from './admin.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        HeaderComponent,
        SidebarComponent,
        ContentContainerComponent,
        DropzoneDirective,
        UploaderComponent,
        UploadTaskComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AdminModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent],
})
export class AppModule {}
