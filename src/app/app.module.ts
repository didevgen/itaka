import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromApp from './store/app.reducer';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/homepage/header/header.component';
import { SidebarComponent } from './components/homepage/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/homepage/content-container/content-container.component';
import { CardsContainerComponent } from './components/homepage/cards-container/cards-container.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AdminModule } from './components/admin-page/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundModule } from './components/not-found/not-found.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalDialogComponent } from './components/profile-edit/modal-dialog/modal-dialog.component';
import { ProfileEditEffect } from './components/profile-edit/store/profile-edit.effects';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RouterContainerComponent } from './components/router-container/router-container.component';
import { TextEditorModule } from './components/editors/text-editor/text-editor.module';
import { CardsContentVideoComponent } from './components/homepage/cards-container/cards-content-video/cards-content-video.component';
import { CardsContentAudioComponent } from './components/homepage/cards-container/cards-content-audio/cards-content-audio.component';
import { CardsContentImageComponent } from './components/homepage/cards-container/cards-content-image/cards-content-image.component';
import { CardsContentTextComponent } from './components/homepage/cards-container/cards-content-text/cards-content-text.component';
import { CardContentDetailComponent } from './components/homepage/cards-container/card-content-detail/card-content-detail.component';
import { UploadMediaModule } from './components/upload-media/upload-media.module';
import { AuthModule } from './components/auth/auth-form/auth-form.module';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/auth/store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from './shared/alert/alert.module';
import { SubmitDialogComponent } from './components/profile-edit/submit-dialog/submit-dialog.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserCardsContainerComponent } from './components/user-page/user-cards-container/user-cards-container.component';
import { GetUserService } from './services/get-user.service';
import { CardButtonsComponent } from './components/homepage/cards-container/card-buttons/card-buttons.component';
import { GetDataService } from './services/get-data.service';
import { UploadDataService } from './services/upload-data.service';
import { SearchService } from './services/search.service';
import { ConfirmationDialogComponent } from './components/profile-edit/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        ContentContainerComponent,
        ProfileEditComponent,
        ModalDialogComponent,
        SubmitDialogComponent,
        RouterContainerComponent,
        CardsContainerComponent,
        CardsContentVideoComponent,
        CardsContentAudioComponent,
        CardsContentImageComponent,
        CardsContentTextComponent,
        CardContentDetailComponent,
        UserPageComponent,
        UserCardsContainerComponent,
        CardButtonsComponent,
        ConfirmationDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        EffectsModule.forRoot([AuthEffects, ProfileEditEffect]),
        StoreModule.forRoot(fromApp.appReducer),
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
        NotFoundModule,
        ImageCropperModule,
        TextEditorModule,
        UploadMediaModule,
        AuthModule,
        SharedModule,
        HttpClientModule,
        AlertModule,
    ],
    providers: [
        AngularFirestore,
        AuthEffects,
        GetUserService,
        GetDataService,
        UploadDataService,
        SearchService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ModalDialogComponent,
        SubmitDialogComponent,
        ConfirmationDialogComponent,
    ],
    exports: [
        ContentContainerComponent,
        CardsContentVideoComponent,
        CardsContentAudioComponent,
        CardsContentImageComponent,
        CardsContentTextComponent,
    ],
})
export class AppModule {}
