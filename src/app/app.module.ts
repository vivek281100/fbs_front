import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { UsernavbarComponent } from './dashboard/usernavbar/usernavbar.component';

//routermodule
import { RouterModule,Routes } from '@angular/router';
import { BookingComponent } from './shared/booking/booking.component';
import { FlightComponent } from './shared/flight/flight.component';
import { PassengerComponent } from './dashboard/passenger/passenger.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'home/register', component: RegisterComponent },
//   { path: 'dashboard/flights', component: FlightsComponent },
//   // { path: 'dashboard/booking', component: BookingComponent },
//   { path: '', redirectTo: 'home', pathMatch: 'full' }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    UpdatepopupComponent,
    UsernavbarComponent,
    BookingComponent,
    FlightComponent,
    PassengerComponent,
    DashboardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
