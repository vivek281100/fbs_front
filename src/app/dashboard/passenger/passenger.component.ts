import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
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

  selectedflight!:Flight;

  seatselectionOption:boolean = false;

  rowNames:string[] = ["ran","A","B","c","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  rows:string[] = []
  // colset1:number[] = [1,2,3,4,5,6]
  // colset2:number[] = []
  cols:number[] = [];

  constructor(private builder:FormBuilder,private route:Router,private userservice : UserService,private toastr:ToastrService) {
    this.userservice.getselectedflight().subscribe((res) => {
      this.selectedflight = res;
      console.log(res);
    })
    this.seatselection();
  }


//#region add passenger form
  AddPassengerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    age: this.builder.control('',Validators.required),
    gender: this.builder.control('',Validators.required),
    email: this.builder.control('',Validators.required),
    phonenumber: this.builder.control('',Validators.required),
    bookingId:0
  });
  //#endregion

  ////fuction to convert booking id to number
  //#region  convert to number
  convertToNumberfromstring(value: string | null): number | null 
  {
    if (value === null) {
      return null;
    }
  
    const parsedValue = parseInt(value, 10);
  
    if (isNaN(parsedValue)) {
      return null;
    }
  
    return parsedValue;
  }
//#endregion

  //when click on cross button , to cancel adding booking.
  //#region cancel passenger add
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
//#endregion

  //to add pasenger.
//#region  add passenger

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
//#endregion
  

//to remove passenger
//#region remove passengers
  OnRemovePassenger(id:number)
  {
    console.log("passenger Id :"+id);
    debugger
    this.userservice.OndeletePassenger(id).subscribe((res) => {
      debugger
      console.log(res)
      if(res.success)
      {debugger
        this.passengers = res.data
        this.toastr.success(res.message)}
      else{
        this.toastr.warning("something went wrong");
      }
    })

  }
//#endregion


  //seat selection after adding passengers
  seatselection(){
    this.seatselectionOption = !this.seatselectionOption;

    if(this.selectedflight === null)
    {
      this.toastr.warning("flight not selected");
    }

    
      let val:number = this.selectedflight.totalNoofseats 
      for(let i = 1;i<= val/6;i++)
      {
        this.rows.push(this.rowNames[i]);
      }
      for(let i = 1;i<=6;i++)
      {
        this.cols.push(i);
      }
    
  }
}
