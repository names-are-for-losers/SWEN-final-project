import { RouterModule, Routes } from '@angular/router';

import { BookingPageComponent } from './booking-page/booking-page.component';
export const routes: Routes = [
    {path:'booking-page',component:BookingPageComponent},
    { path: '', redirectTo: '/booking-page', pathMatch: 'full' }] ;
