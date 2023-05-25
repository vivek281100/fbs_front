import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent {

  constructor(private builder:FormBuilder,private adminservice:AdminService,private toastr:ToastrService)
  {

  }


flights:Flight[] = [];

  AddFlightForm = this.builder.group({
    flight_Name: this.builder.control('', Validators.required),
    flight_code: this.builder.control('',Validators.required),
    departureAirportName: this.builder.control('',Validators.required),
    departureAirportCode: this.builder.control('',Validators.required),
    arriavalAirportName: this.builder.control('',Validators.required),
    arraiavalAirportCode: this.builder.control('',Validators.required),
    departureDate: this.builder.control('',Validators.required),
    arrivalDate: this.builder.control('',Validators.required),
    departureCity:  this.builder.control('',Validators.required),
    arrivalCity: this.builder.control('',Validators.required),
    departureTime: this.builder.control('',Validators.required),
    arrivalTime: this.builder.control('',Validators.required),
    basePrice: this.builder.control('',Validators.required),
    totalNoofseats:this.builder.control('',Validators.required),
    isrunning:this.builder.control('',Validators.required)
  });


  onFlightAdd()
  {

    if(!this.AddFlightForm.valid)
    {
      debugger
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.warning("Entered data is invalid");
    }
    debugger
    this.adminservice.AddFlight(this.AddFlightForm.value).subscribe((res) => {
     debugger
      if(!res.success)
      {
        this.toastr.warning(res.message);
      }
      this.flights = res.data;
      this.toastr.success(res.message,"Wow!")
    })
  }

  // "flightId": 0,
  // "flight_Name": "string",
  // "flight_code": "string",
  // "departureAirportName": "string",
  // "departureAirportCode": "string",
  // "arriavalAirportName": "string",
  // "arraiavalAirportCode": "string",
  // "departureDate": "2023-05-25T14:43:17.503Z",
  // "arrivalDate": "2023-05-25T14:43:17.503Z",
  // "departureCity": "string",
  // "arrivalCity": "string",
  // "departureTime": "2023-05-25T14:43:17.503Z",
  // "arrivalTime": "2023-05-25T14:43:17.503Z",
  // "basePrice": 0,
  // "totalNoofseats": 0,
  // "isrunning": true
}
