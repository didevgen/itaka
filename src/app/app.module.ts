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
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      SidebarComponent,
      ContentContainerComponent,
    ],
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
