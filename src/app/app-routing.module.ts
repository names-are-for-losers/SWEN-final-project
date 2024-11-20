import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // Default route now points to Home Page
  { path: 'login-page', component: LoginPageComponent },
  { path: 'signup-page', component: SignupPageComponent },
  { path: 'home-page', component: HomePageComponent }, // Home Page route
  { path: 'event-page', component: EventPageComponent },
  { path: 'booking-page', component: BookingPageComponent },
  { path: 'appointment-page', component: AppointmentPageComponent },
  { path: '**', redirectTo: '/home-page' }, // Wildcard route redirects to Home Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
