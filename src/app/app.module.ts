import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Added ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Added HttpClientModule

import { EventPageComponent } from './event-page/event-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component'; // Added LoginPageComponent

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BookingPageComponent,
    AppointmentPageComponent,
    SignupPageComponent,
    HomePageComponent,
    LoginPageComponent // Ensure LoginPageComponent is declared here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add this for Reactive Forms
    HttpClientModule // Add this for making HTTP requests
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
