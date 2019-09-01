import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/homepage/header/header.component';
import { SidebarComponent } from './components/homepage/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { CardsContainerComponent } from './components/homepage/cards-container/cards-container.component';
import { GoogleInWithAuth0Component } from './components/auth/googlein-with-auth0/googleIn-with-auth0.component';
import { GoogleAuthComponent } from './components/auth/google-auth/google-auth.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { DropzoneDirective } from './components/test-upload/upload.directive';
import { UploaderComponent } from './components/test-upload/uploader/uploader.component';
import { UploadTaskComponent } from './components/test-upload/upload-task/upload-task.component';
import { environment } from '../environments/environment';
import { AdminModule } from './components/admin-page/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/auth/login/login.module';
import { RegisterModule } from './components/auth/register/register.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalDialogComponent } from './components/profile-edit/modal-dialog/modal-dialog.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RouterContainerComponent } from './components/router-container/router-container.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { ProfileEditEffect } from './components/profile-edit/store/profile-edit.effects';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        ContentContainerComponent,
        DropzoneDirective,
        UploaderComponent,
        UploadTaskComponent,
        ProfileEditComponent,
        ModalDialogComponent,
        RouterContainerComponent,
        CallbackComponent,
        ProfileComponent,
        CardsContainerComponent,
        GoogleInWithAuth0Component,
        GoogleAuthComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
        EffectsModule.forRoot([ProfileEditEffect]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AdminModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        LoginModule,
        RegisterModule,
        NotFoundModule,
        AppRoutingModule,
        ImageCropperModule,
    ],
    providers: [AngularFirestore],
    bootstrap: [AppComponent],
    entryComponents: [ModalDialogComponent],
    exports: [ContentContainerComponent],
})
export class AppModule {}
