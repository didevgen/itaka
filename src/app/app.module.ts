import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/homepage/header/header.component';
import { SidebarComponent } from './components/homepage/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { CardsContainerComponent } from './components/homepage/cards-container/cards-container.component';
import { GoogleInWithAuth0Component } from './components/auth/googlein-with-auth0/googleIn-with-auth0.component';
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
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserPageModule } from './components/user-page/user.module';
import { CardsContentVideoComponent } from './components/homepage/cards-container/cards-content-video/cards-content-video.component';
import { CardsContentAudioComponent } from './components/homepage/cards-container/cards-content-audio/cards-content-audio.component';
import { CardsContentImageComponent } from './components/homepage/cards-container/cards-content-image/cards-content-image.component';
import { CardsContentTextComponent } from './components/homepage/cards-container/cards-content-text/cards-content-text.component';
import { CardContentDetailComponent } from './components/homepage/cards-container/card-content-detail/card-content-detail.component';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthModule } from '../app/components/auth/auth-form/auth-form.module';
import { SharedModule } from '../app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../app/components/auth/store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from '../app/shared/alert/alert.module';

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
        UserPageComponent,
        CardsContentVideoComponent,
        CardsContentAudioComponent,
        CardsContentImageComponent,
        CardsContentTextComponent,
        CardContentDetailComponent,
        // AuthFormComponent,
        // AlertComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(fromApp.appReducer),
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
        UserPageModule,
        AuthModule,
        SharedModule,
        HttpClientModule,
        AlertModule,
    ],
    providers: [AngularFirestore, AuthEffects],
    bootstrap: [AppComponent],
    entryComponents: [ModalDialogComponent],
    exports: [ContentContainerComponent],
})
export class AppModule {}
