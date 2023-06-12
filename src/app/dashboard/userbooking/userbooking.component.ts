import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/Models/Booking';
import { Payment } from 'src/app/Models/Payment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.component.html',
  styleUrls: ['./userbooking.component.css'],
})
export class UserbookingComponent {
  /**
   *
   */

  bookings: Booking[] = [];
  payment!: any;
  displaypayment: boolean = false;
  constructor(private userservice: UserService, private toastr: ToastrService) {
    this.getbookingsbyuser();
  }

  getbookingsbyuser() {
    this.userservice.getbookings().subscribe((res) => {
      if (res.success) {
        this.bookings = res.data;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  removebooking(id: number) {
    debugger;
    this.userservice.onBookingCancel(id).subscribe((res) => {
      debugger;
      if (res.success) {
        debugger;
        this.getbookingsbyuser();
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  paymentinfo(id: number) {
    // this.displaypayment = true;
    this.userservice.paymentbybookingid(id).subscribe((res) => {
      console.log(res);
      debugger;
      if (res.success) {
        debugger;
        this.payment = res.data;
        this.displaypayment = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  flightandpassengerinfo(id: number) {}
}
