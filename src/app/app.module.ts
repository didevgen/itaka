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
import { ContentImgComponent } from './components/admin-page/content-img/content-img.component';
import { UserComponent } from './components/admin-page/user/user.component';
import { UserDialogComponent } from './components/admin-page/user-dialog/user-dialog.component';
import { ContentHeaderComponent } from './components/admin-page/content-header/content-header.component';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { UserHeaderComponent } from './components/admin-page/user-header/user-header.component';
import { ContentAudioComponent } from './components/admin-page/content-audio/content-audio.component';
import { ContentVideoComponent } from './components/admin-page/content-video/content-video.component';
import { ContentBlogComponent } from './components/admin-page/content-blog/content-blog.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ContentImgComponent,
        UserComponent,
        UserDialogComponent,
        ContentHeaderComponent,
        AdminContainerComponent,
        UserHeaderComponent,
        ContentAudioComponent,
        ContentVideoComponent,
        ContentBlogComponent,
        HeaderComponent,
        SidebarComponent,
        ContentContainerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
