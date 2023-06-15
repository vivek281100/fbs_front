import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getUser } from 'src/app/Models/GetUser';
import { passenger } from 'src/app/Models/Passenger';
import { Payment } from 'src/app/Models/Payment';
import { UserService } from 'src/app/services/user.service';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  animations: [
    trigger('staggeredAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '1000ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PaymentsComponent {
  /**
   *
   */

  cost: number = 0;
  confirmstatus: boolean = false;
  passengers: passenger[] = [];
  user: getUser = new getUser();
  paymentObj: Payment = new Payment();
  cardForm!: FormGroup;

  ptax!: number;
  gst!: number;
  totalCost!: number;
  cardtax!: number;
  totalCash!: number;

  constructor(
    private activeroute: ActivatedRoute,
    private userservice: UserService,
    private toastr: ToastrService,
    private route: Router,
    private builder: FormBuilder
  ) {
    this.getcost();
    this.getpassengers();
    this.getuser();
    this.calculatetotalamount();
  }

  ngOnInit() {
    this.createForm();
  }

  calculatetotalamount() {
    this.ptax = (this.cost / 100) * 2.25;
    this.gst = (this.cost / 100) * 4.86;
    this.cardtax = (this.cost / 100) * 1.24;

    this.totalCost = this.cost + this.ptax + this.gst;
    // this.totalCash = this.totalCost + this.cardtax
  }
  getcost() {
    this.activeroute.paramMap.subscribe((res) => {
      let val = res.get('cost');
      if (val !== null) {
        this.cost = +val;
      }
    });
  }

  getuser() {
    this.userservice.getuserinfo().subscribe((res) => {
      this.user = res.data;
    });
  }

  createForm() {
    this.cardForm = this.builder.group({
      cardNumber: this.builder.control('', Validators.required),
      cardExpiration: this.builder.control('', Validators.required),
      cardCVV: this.builder.control('', Validators.required),
    });
  }
  ////fuction to convert booking id to number
  //#region  convert to number
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
  //#endregion

  getpassengers() {
    let id = this.convertToNumberfromstring(
      sessionStorage.getItem('bookingid')
    );
    this.userservice.getpassengersbybookingid(id).subscribe((res) => {
      if (res.success) {
        this.passengers = res.data;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  payment(val: string) {
    if (this.cardForm.valid) {
      // debugger;
      this.paymentObj.payment_Mode = val;

      let bid = sessionStorage.getItem('bookingid');
      let bookid: number;
      // debugger;
      if (bid !== null) {
        // debugger;
        bookid = +bid;
        this.paymentObj.bookingid = +bid;
      }
      this.paymentObj.paymentStatus = true;
      if (val == 'Card') {
        this.paymentObj.total_Price = this.totalCost + this.cardtax;
      } else {
        this.paymentObj.total_Price = this.totalCost;
      }
      // debugger;
      this.userservice.addpayment(this.paymentObj).subscribe((res) => {
        // debugger;
        console.log(res);
        if (res.success) {
          // debugger;
          this.userservice.updatebookingstatus(bookid).subscribe((res) => {
            if (res.success) {
              // debugger;
              this.route.navigate(['dashboard/userbooking']);
              this.toastr.success(res.message);
            } else {
              this.toastr.warning(res.warning);
            }
          });
          // this.toastr.success(res.message);
        } else {
          this.toastr.warning(res.message);
        }
      });
    }
  }
}
