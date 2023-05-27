import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignupFormateurComponent } from './signupFormateur/signupFormateur.component';
import { SignupApprentiComponent } from './signupApprenti/signupApprenti.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileApprentiComponent } from './profileApprenti/profileApprenti.component';
import { ProfileFormateurComponent } from './profileFormateur/profileFormateur.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignupApprentiComponent,
    SignupFormateurComponent,
    LandingComponent,
    ProfileComponent,
    ProfileApprentiComponent,
    ProfileFormateurComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
