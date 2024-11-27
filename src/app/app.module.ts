import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EventPageComponent } from './event-page/event-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'event-page', component: EventPageComponent },
  { path: 'booking-page', component: BookingPageComponent },
  { path: 'appointment-page', component: AppointmentPageComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'signup-page', component: SignupPageComponent },
  { path: '**', redirectTo: '/home-page' }
];

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BookingPageComponent,
    AppointmentPageComponent,
    SignupPageComponent,
    LoginPageComponent,
    HomePageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
