import { Component } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Flight } from 'src/app/Models/Flight';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  /**
   *
   */
  constructor(private builder:FormBuilder,private userservice:UserService,private route:Router,private toastr:ToastrService) {
    
  }

  searchflightsform = this.builder.group({
    departureCity: this.builder.control('', Validators.required),
    arrivalCity: this.builder.control('', Validators.required),
    departureDate: this.builder.control('',Validators.required)
  });
  
  flights:Flight[] = [];

  onSearchFlights()
  {
    // debugger
    if(this.searchflightsform.valid)
    {
      console.log(this.searchflightsform)
      console.log(this.searchflightsform.value.departureDate)
      this.userservice.onBooking(this.searchflightsform.value).subscribe((res) => {
        this.userservice.setFlights(res.data);
      console.log('responce: -'+ res)
      if(res.success)
      { 
        //  debugger
        console.log('res data : '+ res.data);
        if(sessionStorage.getItem('Token') != null )
        {
          this.toastr.success(res.message);
          this.route.navigate(['dashboard/flights']);
          
        }
        else{
          this.toastr.success(res.message + "✈️");
          this.route.navigate(['home/flights']);
        }
      }
      else{
        // debugger
        console.log(res.data)
        this.toastr.warning(res.message + "try again");
        // this.route.navigate(['home/flights']);
      }
    })
    }
    else{
      console.log("failed");
    }

  }
}
