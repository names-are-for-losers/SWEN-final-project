import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Add this

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventPageComponent } from './event-page/event-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BookingPageComponent,
    AppointmentPageComponent,
    SignupPageComponent,
    HomePageComponent,
    LoginPageComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // Ensure this is added for HttpClient to work
  ],
  providers: [
    provideHttpClient(withFetch()), // Enable fetch APIs for SSR compatibility
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
