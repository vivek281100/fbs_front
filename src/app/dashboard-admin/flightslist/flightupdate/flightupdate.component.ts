import { DatePipe } from '@angular/common';
import { Component,Input, OnInit } from '@angular/core';
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
export class FlightupdateComponent implements OnInit{

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
    // debugger
    // if (this.updateflightdate) {
    //   this.updateflightForm.patchValue(this.updateflightdate);
    // }
  }

  ngOnInit()
  {
    this.createForm();
  }
 
  formateddate(value:any)
  {
    console.log(value);
    console.log(this.datePipe.transform(value,"dd-mm-yyyy"));
    return  this.datePipe.transform(value, 'dd-mm-yyyy');
  }
  formatedtime(value:any)
  {
    return this.datePipe.transform(value, "HH:mm")
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
      DepartureDate: [this.formateddate(this.updateflightdate.departureDate) , Validators.required],
      ArrivalDate: [this.formateddate(this.updateflightdate.arrivalDate), Validators.required],
      DepartureCity: [this.updateflightdate.departureCity, Validators.required],
      ArrivalCity: [this.updateflightdate.arrivalCity, Validators.required],
      DepartureTime: [this.formatedtime(this.updateflightdate.departureTime), Validators.required],
      ArrivalTime: [this.formatedtime(this.updateflightdate.arrivalTime), Validators.required],
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
    const editdepartureTime = this.updateflightForm.value.DepartureTime.split(':');
    const departureTime = new Date();
    departureTime.setHours(+editdepartureTime[0], +editdepartureTime[1]);
  
    const editarrivalTime = this.updateflightForm.value.ArrivalTime.split(':');
    const arrivalTime = new Date()
    arrivalTime.setHours(editarrivalTime[0], editarrivalTime[1]);
  
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
      // DepartureTime: this.updateflightForm.value.departureTime , 
      // ArrivalTime: this.updateflightForm.value.arrivalTime, 
      ArrivalTime: arrivalTime.toISOString(),
      BasePrice: this.updateflightForm.value.BasePrice,
      TotalNoofseats: this.updateflightForm.value.TotalNoofseats,
      Isrunning: this.updateflightForm.value.Isrunning
    };

    this.adminservice.updateflight(flightData).subscribe((res) => {
      if(res.success)
      {
        this.toastr.success(res.message)
        // this.dialofref.close();
      }
      else{
        this.toastr.warning(res.message)
      }
    })
}
}