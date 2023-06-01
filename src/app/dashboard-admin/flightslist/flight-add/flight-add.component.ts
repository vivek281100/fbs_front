import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css'],
  providers:[DatePipe]
})
export class FlightAddComponent {

  flightForm!: FormGroup;

  constructor(private builder:FormBuilder,private adminservice:AdminService,private toastr:ToastrService,private datePipe:DatePipe,private dialog:MatDialog,private route:Router)
  {

  }


flights:Flight[] = [];

  // AddFlightForm = this.builder.group({
  //   flight_Name: this.builder.control('', Validators.required),
  //   flight_code: this.builder.control('',Validators.required),
  //   departureAirportName: this.builder.control('',Validators.required),
  //   departureAirportCode: this.builder.control('',Validators.required),
  //   arriavalAirportName: this.builder.control('',Validators.required),
  //   arraiavalAirportCode: this.builder.control('',Validators.required),
  //   departureDate: this.builder.control('',Validators.required),
  //   arrivalDate: this.builder.control('',Validators.required),
  //   departureCity:  this.builder.control('',Validators.required),
  //   arrivalCity: this.builder.control('',Validators.required),
  //   departureTime: this.builder.control('',Validators.required),
  //   arrivalTime: this.builder.control('',Validators.required),
  //   basePrice: this.builder.control(0,Validators.required),
  //   totalNoofseats:this.builder.control(0,Validators.required),
  //   isrunning:this.builder.control(true,Validators.required)
  // });

  ngOnInit() {
    this.createForm();
  }

   today = new Date().toISOString().split('T')[0];

  createForm() {
    this.flightForm = this.builder.group({
      Flight_Name: ['', Validators.required],
      Flight_code: ['', Validators.required],
      DepartureAirportName: ['', Validators.required],
      DepartureAirportCode: ['', Validators.required],
      ArriavalAirportName: ['', Validators.required],
      ArraiavalAirportCode: ['', Validators.required],
      DepartureDate: ['', Validators.required],
      ArrivalDate: ['', Validators.required],
      DepartureCity: ['', Validators.required],
      ArrivalCity: ['', Validators.required],
      DepartureTime: ['', Validators.required],
      ArrivalTime: ['', Validators.required],
      BasePrice: ['', Validators.required],
      TotalNoofseats: ['', Validators.required],
      Isrunning: [true, Validators.required]
    });
  }



  onFlightAdd()
  {

    if(this.flightForm.valid)
    {
      debugger
      console.log(this.flightForm.value)
   
      //
      const editdepartureTime = this.flightForm.value.DepartureTime.split(':');
      const departureTime = new Date();
      departureTime.setUTCHours(+editdepartureTime[0], +editdepartureTime[1]);
  
    
      const editarrivalTime = this.flightForm.value.ArrivalTime.split(':');
      const arrivalTime = new Date();
      arrivalTime.setUTCHours(+editarrivalTime[0], +editarrivalTime[1]);
    
      const flightData = {
        Flight_Name: this.flightForm.value.Flight_Name,
        Flight_code: this.flightForm.value.Flight_code,
        DepartureAirportName: this.flightForm.value.DepartureAirportName,
        DepartureAirportCode: this.flightForm.value.DepartureAirportCode,
        ArriavalAirportName: this.flightForm.value.ArriavalAirportName,
        ArraiavalAirportCode: this.flightForm.value.ArraiavalAirportCode,
        DepartureDate: this.flightForm.value.DepartureDate,
        ArrivalDate: this.flightForm.value.ArrivalDate,
        DepartureCity: this.flightForm.value.DepartureCity,
        ArrivalCity: this.flightForm.value.ArrivalCity,
        DepartureTime: departureTime.toISOString(),
        ArrivalTime: arrivalTime.toISOString(),
        BasePrice: this.flightForm.value.BasePrice,
        TotalNoofseats: this.flightForm.value.TotalNoofseats,
        Isrunning: this.flightForm.value.Isrunning
      };
    
      //
      debugger
      this.adminservice.AddFlight(flightData).subscribe((res) => {
       debugger
        if(!res.success)
        {
          this.toastr.warning(res.message);
        }
        this.flights = res.data;
        this.toastr.success(res.message,"Wow!")
        
        this.dialog.closeAll()
      })
     
    }
    debugger
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.warning("Entered data is invalid");
   
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
