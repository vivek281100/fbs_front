import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './gurd/auth.guard';
import { BookingComponent } from './shared/booking/booking.component';
import { FlightComponent } from './shared/flight/flight.component';
import { PassengerComponent } from './dashboard/passenger/passenger.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { OptionsComponent } from './dashboard-admin/options/options.component';
import { BookinglistComponent } from './dashboard-admin/bookinglist/bookinglist.component';
import { FlightslistComponent } from './dashboard-admin/flightslist/flightslist.component';
import { UsersComponent } from './dashboard-admin/users/users.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { UserbookingComponent } from './dashboard/userbooking/userbooking.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'booking',
        component: BookingComponent,
      },
      { path: 'flights', component: FlightComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // {
      //   path:'logout',
      //   redirectTo:'home',
      //   pathMatch:'full'
      // },
      { path: 'flights', component: FlightComponent },
      { path: 'passenger', component: PassengerComponent },
      { path: 'payments/:cost', component: PaymentsComponent },
      { path: 'userbooking', component: UserbookingComponent },
      { path: 'booking', component: BookingComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home/booking', pathMatch: 'full' },
  // {path:'dashboard',redirectTo:'dashboard/userbooking', pathMatch:'full'},
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'options', component: OptionsComponent },
      {
        path: 'bookinglist/:id',
        component: BookinglistComponent,
      },
      {
        path: 'flights',
        component: FlightslistComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
  {
    path: 'passtest',
    component: PassengerComponent,
  },
  // {
  //   path:'dashboard/logout',
  //   redirectTo:'home',
  //   pathMatch:'full'
  // }
  // // {
  //   path:'home/login',
  //   component:LoginComponent
  // },
  // {
  //   path:'home/register',
  //   component:RegisterComponent
  // },
  // {
  //   path:'dashboard',
  //   component:DashboardComponent,
  //   canActivate:[AuthGuard]
  // }
  // {
  //   path:'flights',
  //   component:FlightsComponent
  // }
  // {component:LoginComponent,path:'login'},
  // {component:RegisterComponent,path:'register'},
  // {component:HomeComponent,path:'',canActivate:[AuthGuard]},
  // // {component:UserComponent,path:'user',canActivate:[AuthGuard]},
  // {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
