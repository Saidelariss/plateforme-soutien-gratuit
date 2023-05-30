import { Component, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { ProfileComponent } from './profile/profile.component';
import { ProfileApprentiComponent } from './profileApprenti/profileApprenti.component';
import { ProfileFormateurComponent } from './profileFormateur/profileFormateur.component';
import { SignupComponent } from './signup/signup.component';
import { SignupApprentiComponent } from './signupApprenti/signupApprenti.component';
import { SignupFormateurComponent } from './signupFormateur/signupFormateur.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    {path: 'SeachFormateur' , component:SearchComponent},
    //{ path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'registerApprenti',           component: SignupApprentiComponent },
    { path: 'registerFormateur',           component: SignupFormateurComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
   // { path: 'profile',          component: ProfileComponent },
    { path: 'profileApprenti',          component: ProfileApprentiComponent },
    { path: 'profileFormateur',          component: ProfileFormateurComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
