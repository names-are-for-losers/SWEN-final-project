import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth.guard'; // Correct import path

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'event-page', component: EventPageComponent, canActivate: [AuthGuard] },
  { path: 'booking-page', component: BookingPageComponent, canActivate: [AuthGuard] },
  { path: 'appointment-page', component: AppointmentPageComponent, canActivate: [AuthGuard] },
  { path: 'signup-page', component: SignupPageComponent },
  { path: '**', redirectTo: '/home-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
