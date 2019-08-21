import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import { MaterialModule } from './material.module';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/auth/login/login.module';
import { RegisterModule } from './components/auth/register/register.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        MaterialModule,
        BrowserModule,
        StoreModule.forRoot(fromApp.appReducer),
        FormsModule,
        BrowserAnimationsModule,
        HomeModule,
        LoginModule,
        RegisterModule,
        NotFoundModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
