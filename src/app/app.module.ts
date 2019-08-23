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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AdminModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
