import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalDialogComponent } from './components/profile-edit/modal-dialog/modal-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        ContentContainerComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileEditComponent,
        ModalDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ImageCropperModule,
        StoreModule.forRoot(fromApp.appReducer),
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ModalDialogComponent],
})
export class AppModule {}
