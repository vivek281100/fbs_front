import {
  trigger,
  transition,
  style,
  animate,
  animateChild,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingListuser } from 'src/app/Models/Booking';
import { Flight } from 'src/app/Models/Flight';
import { passenger } from 'src/app/Models/Passenger';
import { Payment } from 'src/app/Models/Payment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.component.html',
  styleUrls: ['./userbooking.component.css'],
  animations: [
    trigger('fadeanimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '1000ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
        // animateChild('1000ms ease',style({opacity:1,transform:'translateY(0)'})),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate(
          '1000ms ease',
          style({ opacity: 0, transform: 'translateY(30px)' })
        ),
      ]),
    ]),
  ],
})
export class UserbookingComponent {
  /**
   *
   */

  bookings: BookingListuser[] = [];
  payment!: Payment;
  displaypayment: boolean = false;
  flight!: Flight;
  passengers!: passenger[];
  displayflightdetail = false;
  displaypassengerdetail = false;

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
    // debugger;
    this.userservice.onBookingCancel(id).subscribe((res) => {
      // debugger;
      if (res.success) {
        // debugger;
        this.getbookingsbyuser();
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  //#region  get flight,passengers and payment by booking id
  flightandpassengerinfo(id: number) {
    if (id == null) {
      this.toastr.warning('snap! somthings wrong. Try again after sometime!');
    } else {
      this.getflightbybookingid(id);
      this.getpassengersbybookingid(id);
      this.paymentinfo(id);
    }
  }

  getflightbybookingid(id: number) {
    this.userservice.getflightbyBookingId(id).subscribe((res) => {
      if (res.success) {
        this.flight = res.data;
        this.displayflightdetail = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  getpassengersbybookingid(id: number) {
    this.userservice.getpassengersbybookingid(id).subscribe((res) => {
      if (res.success) {
        this.passengers = res.data;
        this.displaypassengerdetail = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  paymentinfo(id: number) {
    // this.displaypayment = true;
    this.userservice.paymentbybookingid(id).subscribe((res) => {
      console.log(res);
      // debugger;
      if (res.success) {
        // debugger;
        this.payment = res.data;
        this.displaypayment = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }
  //#endregion
}
