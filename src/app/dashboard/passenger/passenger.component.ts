import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { passenger } from 'src/app/Models/Passenger';
import { UserService } from 'src/app/services/user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate(
          '1000ms ease',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PassengerComponent {
  /**
   *
   */
  //variables
  passengers: passenger[] = [];
  selectedflight!: Flight;
  seatselectionOption: boolean = false;
  passengerAddOption: boolean = false;
  rowNames: string[] = [
    'ran',
    'A',
    'B',
    'c',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  rows: string[] = [];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cost: number = 0;

  //temp
  currentseat: string = '';

  flightObj: Flight = {
    arraiavalAirportCode: 'MlA',
    arriavalAirportName: 'Mala Airport',
    arrivalCity: 'Maldives',
    arrivalDate: '2023-05-28T00:00:00',
    arrivalTime: '2023-05-28T19:30:37.479',
    basePrice: 20940,
    departureAirportCode: 'GHA',
    departureAirportName: 'Great HYD Airport',
    departureCity: 'Hyderabad',
    departureDate: '2023-05-27T00:00:00',
    departureTime: '2023-05-27T18:30:00.479',
    flight_Name: 'IndiNo420',
    flight_code: 'In420',
    id: 4,
    isrunning: true,
    totalNoofseats: 120,
  };
  selectedSeats: string[] = [];

  constructor(
    private builder: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private toastr: ToastrService
  ) {
    // this.userservice.getselectedflight().subscribe((res) => {
    //   this.selectedflight = res;
    //   console.log(res);
    // });

    this.selectedflight = this.flightObj;
    this.getPassengers();
    this.seatselection();
  }

  //#region add passenger form
  AddPassengerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phonenumber: this.builder.control('', Validators.required),
    allocatedSeat: '',
    bookingId: 0,
  });
  //#endregion

  // arraiavalAirportCode
  // :
  // "MlA"
  // arriavalAirportName
  // :
  // "Mala Airport"
  // arrivalCity
  // :
  // "Maldives"
  // arrivalDate
  // :
  // "2023-05-28T00:00:00"
  // arrivalTime
  // :
  // "2023-05-28T19:30:37.479"
  // basePrice
  // :
  // 20940
  // departureAirportCode
  // :
  // "GHA"
  // departureAirportName
  // :
  // "Great HYD Airport"
  // departureCity
  // :
  // "Hyderabad"
  // departureDate
  // :
  // "2023-05-27T00:00:00"
  // departureTime
  // :
  // "2023-05-27T18:30:00.479"
  // flight_Name
  // :
  // "IndiNo420"
  // flight_code
  // :
  // "In420"
  // id
  // :
  // 4
  // isrunning
  // :
  // true
  // totalNoofseats
  // :
  // 120

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

  //when click on cross button , to cancel adding booking.
  //#region cancel passenger add
  OnCancelPassengerAdd() {
    //converting booking id to number | null
    let id: number | null = this.convertToNumberfromstring(
      sessionStorage.getItem('bookingid')
    );
    // let id : number =  convertToNumber(idnum);
    this.userservice.onBookingCancel(id).subscribe((res) => {
      console.log(res);
      this.toastr.success(res.message);
      this.route.navigate(['dashboard/flights']);
    });
  }
  //#endregion

  //get passengers
  getPassengers() {
    let id: number | null = this.convertToNumberfromstring(
      sessionStorage.getItem('bookingid')
    );
    this.userservice.getpassengersbybookingid(id).subscribe((res) => {
      if (res.success) {
        this.passengers = res.data;
      } else {
        this.toastr.warning(res.message);
      }
    });
    this.calculateCost();
  }

  //to add pasenger.
  //#region  add passenger

  AddPassenger() {
    debugger;
    this.AddPassengerForm.value.bookingId = this.convertToNumberfromstring(
      sessionStorage.getItem('bookingid')
    );
    this.AddPassengerForm.value.allocatedSeat = this.currentseat;
    if (this.AddPassengerForm.valid) {
      this.userservice
        .OnAddPassenger(this.AddPassengerForm.value)
        .subscribe((res) => {
          this.passengers = res.data;
          console.log(res);
          console.log(this.passengers);
        });
    } else {
      this.toastr.error('Enter Required details');
    }
    this.calculateCostOnAdd();
  }
  //#endregion

  //to remove passenger
  //#region remove passengers
  OnRemovePassenger(id: number) {
    console.log('passenger Id :' + id);
    debugger;
    this.userservice.OndeletePassenger(id).subscribe((res) => {
      debugger;
      console.log(res);
      if (res.success) {
        debugger;
        this.passengers = res.data;
        this.toastr.success(res.message);
      } else {
        this.toastr.warning('something went wrong');
      }
    });
    this.calculateCostOnremove();
  }
  //#endregion

  //seat selection after adding passengers
  seatselection() {
    this.seatselectionOption = !this.seatselectionOption;

    if (this.selectedflight === null) {
      this.toastr.warning('flight not selected');
    }

    let val: number = this.selectedflight.totalNoofseats;
    for (let i = 1; i < val / 10; i++) {
      this.rows.push(this.rowNames[i]);
    }
  }

  //selected seats to display.
  onSeatSelectionChange(seat: string) {
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
      this.passengers.forEach((item) => {
        if (item.allocatedSeat === seat) {
          this.OnRemovePassenger(item.id);
        }
      });
    } else {
      if (this.selectedSeats.length <= 6) {
        this.selectedSeats.push(seat);
      }
    }
  }

  //disabling seats
  isSeatDisabled(seat: string) {
    if (this.selectedSeats.length >= 6) {
      if (this.selectedSeats.includes(seat)) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  //add passenger opiton
  addPassengerOption(seat: string) {
    this.currentseat = seat;
    this.passengerAddOption = !this.passengerAddOption;
  }

  payments() {
    this.route.navigate(['/dashboard/payments', this.cost]);
  }

  private calculateCost() {
    for (let i = 0; i < this.passengers.length; i++) {
      this.cost += this.selectedflight.basePrice;
    }
  }

  private calculateCostOnAdd() {
    // this.passengers.forEach(item => {
    this.cost += this.selectedflight.basePrice;
    // })
  }
  private calculateCostOnremove() {
    // this.passengers.forEach(item => {
    this.cost -= this.selectedflight.basePrice;
    // })
  }
}
