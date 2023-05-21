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

const routes: Routes = [
  {
  path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path:'booking',component:BookingComponent
      },
      { path:'flights',component:FlightComponent}
    ]
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
      {path:'passenger',component:PassengerComponent}
      // { path: 'booking', component: BookingComponent }
    ],
    canActivate:[AuthGuard]
  },
  { path: '', redirectTo: 'home/booking', pathMatch: 'full' },
  {
    path:'dashboard-admin',
    component:DashboardAdminComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'passtest',
    component:PassengerComponent
  }
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
