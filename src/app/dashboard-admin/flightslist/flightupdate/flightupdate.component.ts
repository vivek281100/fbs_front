import { DatePipe } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flightupdate',
  templateUrl: './flightupdate.component.html',
  styleUrls: ['./flightupdate.component.css']
})
export class FlightupdateComponent {

   updateflightdate : any;

  updateflightForm!: FormGroup;

  constructor(private builder:FormBuilder,private adminservice:AdminService,private toastr:ToastrService,private datePipe:DatePipe,private dialofref:MatDialogRef<FlightupdateComponent>)
  {
    // let id:number = sessionStorage.getItem("flightId");
    // parseInt(id)
      this.adminservice.getFlightvalue().subscribe(
        (res) => {
          this.updateflightdate = res
        }
      )
      console.log(this.updateflightdate);   
    this.createForm();
    // debugger
    // if (this.updateflightdate) {
    //   this.updateflightForm.patchValue(this.updateflightdate);
    // }
  }

 


flights:Flight[] = [];

  createForm() {
    this.updateflightForm = this.builder.group({
      Id:[this.updateflightdate.id,Validators.required],
      Flight_Name: [this.updateflightdate.flight_Name, Validators.required],
      Flight_code: [this.updateflightdate.flight_code, Validators.required],
      DepartureAirportName: [this.updateflightdate.departureAirportName, Validators.required],
      DepartureAirportCode: [this.updateflightdate.departureAirportCode, Validators.required],
      ArriavalAirportName: [this.updateflightdate.arriavalAirportName, Validators.required],
      ArraiavalAirportCode: [this.updateflightdate.arraiavalAirportCode, Validators.required],
      DepartureDate: [this.updateflightdate.departureDate, Validators.required],
      ArrivalDate: [this.updateflightdate.arrivalDate, Validators.required],
      DepartureCity: [this.updateflightdate.departureCity, Validators.required],
      ArrivalCity: [this.updateflightdate.arrivalCity, Validators.required],
      DepartureTime: [this.updateflightdate.departureTime, Validators.required],
      ArrivalTime: [this.updateflightdate.arrivalTime, Validators.required],
      BasePrice: [this.updateflightdate.basePrice, Validators.required],
      TotalNoofseats: [this.updateflightdate.totalNoofseats, Validators.required],
      Isrunning: [this.updateflightdate.isrunning, Validators.required]
    });
  }
  


  onFlightupdate()
  {
    debugger

    if(!this.updateflightForm.valid)
    {
      
      debugger
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.warning("Entered data is invalid");
    }
    console.log(this.updateflightForm.value)
   
    //
    const departureTimeParts = this.updateflightForm.value.DepartureTime.split(':');
    const departureTime = new Date();
    departureTime.setHours(+departureTimeParts[0], +departureTimeParts[1]);
  
    const arrivalTimeParts = this.updateflightForm.value.ArrivalTime.split(':');
    const arrivalTime = new Date();
    arrivalTime.setHours(+arrivalTimeParts[0], +arrivalTimeParts[1]);
  
    const flightData = {
      Id: this.updateflightForm.value.Id,
      Flight_Name: this.updateflightForm.value.Flight_Name,
      Flight_code: this.updateflightForm.value.Flight_code,
      DepartureAirportName: this.updateflightForm.value.DepartureAirportName,
      DepartureAirportCode: this.updateflightForm.value.DepartureAirportCode,
      ArriavalAirportName: this.updateflightForm.value.ArriavalAirportName,
      ArraiavalAirportCode: this.updateflightForm.value.ArraiavalAirportCode,
      DepartureDate: this.updateflightForm.value.DepartureDate,
      ArrivalDate: this.updateflightForm.value.ArrivalDate,
      DepartureCity: this.updateflightForm.value.DepartureCity,
      ArrivalCity: this.updateflightForm.value.ArrivalCity,
      DepartureTime: departureTime.toISOString(),
      ArrivalTime: arrivalTime.toISOString(),
      BasePrice: this.updateflightForm.value.BasePrice,
      TotalNoofseats: this.updateflightForm.value.TotalNoofseats,
      Isrunning: this.updateflightForm.value.Isrunning
    };

    this.adminservice.updateflight(flightData).subscribe((res) => {
      if(res.success)
      {
        this.toastr.success(res.message)
        this.dialofref.close();
      }
      else{
        this.toastr.warning(res.message)
      }
    })
}
}