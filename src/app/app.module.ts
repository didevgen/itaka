import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import * as fromApp from './store/app.reducer';
import { HomeModule } from './components/home/home.module';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
// import { LoginModule } from './components/login/login.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent, RegisterComponent, NotFoundComponent, LoginComponent], // LoginComponent,
    imports: [
        BrowserModule,
        StoreModule.forRoot(fromApp.appReducer),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HomeModule,
        // LoginModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
