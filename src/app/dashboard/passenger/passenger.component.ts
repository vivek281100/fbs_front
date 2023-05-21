import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passenger } from 'src/app/Models/Passenger';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent {

  /**
   *
   */
  //variables
  passengers: passenger[] = [];


  constructor(private builder:FormBuilder,private route:Router,private userservice : UserService,private toastr:ToastrService) {
  }



  AddPassengerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    age: this.builder.control('',Validators.required),
    gender: this.builder.control('',Validators.required),
    email: this.builder.control('',Validators.required),
    phonenumber: this.builder.control('',Validators.required),
    bookingId:0
  });
  

  ////fuction to convert booking id to number
   convertToNumberfromstring(value: string | null): number | null {
    if (value === null) {
      return null;
    }
  
    const parsedValue = parseInt(value, 10);
  
    if (isNaN(parsedValue)) {
      return null;
    }
  
    return parsedValue;
  }

  //when click on cross button , to cancel adding booking.
  OnCancelPassengerAdd()
  {
  //converting booking id to number | null
    let id : number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingid'))
    // let id : number =  convertToNumber(idnum);
    this.userservice.onBookingCancel(id).subscribe((res) => {
      console.log(res)
      this.toastr.success(res.message)
      this.route.navigate(['dashboard/flights']);
    })
  }


  //to add pasenger.
  AddPassenger()
  {
    
    this.AddPassengerForm.value.bookingId = this.convertToNumberfromstring(sessionStorage.getItem('bookingid'))
    if(this.AddPassengerForm.valid)
    {
    this.userservice.OnAddPassenger(this.AddPassengerForm.value).subscribe((res) => {
      this.passengers = res.data;
      console.log(res);
      console.log(this.passengers)
    })
  }
  else{
    this.toastr.error("Enter Required details");
  }
  }

  //to remove passenger
  OnRemovePassenger(id:number)
  {
    console.log("passenger Id :"+id);
    debugger
    this.userservice.OndeletePassenger(id).subscribe((res) => {
      debugger
      console.log(res)
      if(res.success)
      {debugger
        this.toastr.success(res.message)}
      else{
        this.toastr.warning("something went wrong");
      }
    })

  }
}
