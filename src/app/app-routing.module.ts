import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeRoutingModule } from './components/home/home-routing.module';
// import {LoginRoutingModule} from './components/login/login-routing.module';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HomeRoutingModule], // , LoginRoutingModule
    exports: [RouterModule],
})
export class AppRoutingModule {}
