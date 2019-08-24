import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import {MaterialModule} from './material.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {DropzoneDirective} from './components/test-upload/upload.directive';
import {UploaderComponent} from './components/test-upload/uploader/uploader.component';
import {UploadTaskComponent} from './components/test-upload/upload-task/upload-task.component';
import {environment} from '../environments/environment';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ContentContainerComponent} from './components/content-container/content-container.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AdminModule} from './admin.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './components/home/home.module';
import {LoginModule} from './components/auth/login/login.module';
import {RegisterModule} from './components/auth/register/register.module';
import {NotFoundModule} from './components/not-found/not-found.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentContainerComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
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
    AngularFireStorageModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    NotFoundModule,
    AppRoutingModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {
}
