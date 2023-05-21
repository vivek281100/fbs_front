import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/Models/Flight';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
flights:Flight[] = [];

  constructor(private userservice:UserService,private route:Router,private toastr:ToastrService)
  {
   // debugger
    this.userservice.getFlights().subscribe((res) => {this.flights = res});
    console.log("flights called");
  }

  // onclick()
  // {
  //   // debugger
  //   this.userservice.getFlights().subscribe((res) => {this.flights = res});
  //   console.log("flights called");
  // }
  flightObj:any= {
    flightId:0
  }

  onFlightSelected(id:number)
    {
      if(sessionStorage.getItem('Token') != null )
      {
        
         this.toastr.success("Flight Selected");
        //  this.flightObj.flightId = id;
         debugger
         this.userservice.onSelectFlights(id).subscribe((res) => {
          console.log(res.data.value)
          debugger
          console.log(res.data.id);
          debugger
          sessionStorage.setItem("bookingid",res.data.id)
          this.route.navigate(['dashboard/passenger']);
         })
        
      }
      else{
        this.toastr.warning("Please Login in to Continue");
        
        // this.route.navigate(['home/flights']);
      }
    }
  
}
