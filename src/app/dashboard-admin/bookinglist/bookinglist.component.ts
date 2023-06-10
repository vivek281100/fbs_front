import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passenger } from 'src/app/Models/Passenger';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent {
  id!:number;
  bookings:any[] = [];
  passengers:passenger[] = [];
  bookingid!:number ;
  constructor(private routeactive:ActivatedRoute,private adminservice:AdminService,private toastr:ToastrService)
  {
    this.getid();
    this.getbookingsbyflightid();
  }

  getid()
  {
    this.routeactive.paramMap.subscribe(params => {
      let value = params.get('id');
      if(value !== null)
      {
        this.id = +value;
      }
    })
  }
  getbookingsbyflightid()
  {
   this.adminservice.getbookindbyflightId(this.id).subscribe((res) => {
    if(res.success)
    {
      this.toastr.toastrConfig.closeButton = true;
      this.toastr.success(res.message);
      this.bookings = res.data;
        console.log(res.data);
        console.log(this.bookings);
    }
    else{
      this.toastr.warning('no bookings found');
    }
   }) 
  }


  getpassengers(id:number)
  {
    this.bookingid = id;
    this.adminservice.getpassengersbybookingid(id).subscribe((res) => {
      if(res.success)
      {
        this.toastr.success(res.message);
      this.passengers = res.data;
      }
      else{
        this.toastr.warning(res.message);
      }
    })
  }

  delpassenger(id:number)
  {
    debugger
    this.adminservice.deletepassenger(id).subscribe((res) => {
      this.toastr.toastrConfig.closeButton = true;
      if(res.success)
      {
        this.toastr.success("passenger removed");
        
      }
      else{
        this.toastr.warning(res.message);
      }
    })
  }
}
