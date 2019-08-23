import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
// import { TestUploadComponent } from './test-upload/test-upload.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { DropzoneDirective } from './test-upload/upload.directive';
import { UploaderComponent } from './test-upload/uploader/uploader.component';
import { UploadTaskComponent } from './test-upload/upload-task/upload-task.component';
import {environment} from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    // TestUploadComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    // AngularFireModule.initializeApp({
    //   apiKey: "AIzaSyCxrH5g8bISv6U7hAs6NNZU93Ia_2E9L9s",
    //   authDomain: "itaka-1f0a0.firebaseapp.com",
    //   storageBucket: "itaka-1f0a0.appspot.com",
    //   databaseURL: "https://itaka-1f0a0.firebaseio.com"
    // }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
