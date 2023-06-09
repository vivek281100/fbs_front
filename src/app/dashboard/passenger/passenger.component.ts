import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { passenger } from 'src/app/Models/Passenger';
import { UserService } from 'src/app/services/user.service';

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
export class PassengerComponent implements OnInit {
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
  cols: number[] = [1, 2, 3, 4, 5, 6];
  cost!: number;

  //temp
  currentseat: string = '';

  // flightObj: Flight = {
  //   arraiavalAirportCode: 'MlA',
  //   arriavalAirportName: 'Mala Airport',
  //   arrivalCity: 'Maldives',
  //   arrivalDate: '2023-05-28T00:00:00',
  //   arrivalTime: '2023-05-28T19:30:37.479',
  //   basePrice: 20940,
  //   departureAirportCode: 'GHA',
  //   departureAirportName: 'Great HYD Airport',
  //   departureCity: 'Hyderabad',
  //   departureDate: '2023-05-27T00:00:00',
  //   departureTime: '2023-05-27T18:30:00.479',
  //   flight_Name: 'IndiNo420',
  //   flight_code: 'In420',
  //   id: 4,
  //   isrunning: true,
  //   totalNoofseats: 120,
  // };

  selectedSeats: string[] = [];
  occupiedseatslist: string[] = [];

  constructor(
    private builder: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private toastr: ToastrService
  ) {
    this.userservice.getselectedflight().subscribe((res) => {
      this.selectedflight = res;
      console.log(res);
    });

    // this.selectedflight = this.flightObj;
    this.costAssign();
    this.getPassengers();
    this.seatselection();
    this.calculateCost();
  }

  ngOnInit() {
    console.log('onitit called');
    this.occupiedseats();
  }

  //assign cost
  costAssign() {
    this.cost = 0;
    let temp = sessionStorage.getItem('cost');
    if (temp !== null) {
      this.cost = +temp;
    }
  }

  // get occupied seats.
  //#region get occupies seats
  occupiedseats() {
    this.userservice
      .getoccupiedseatsbyflightid(this.selectedflight.id)
      .subscribe((res) => {
        console.log('seats' + res);
        if (res.success) {
          this.occupiedseatslist = res.data;
          debugger;
          console.log('seats' + this.occupiedseatslist);
          debugger;
        }
      });
  }
  //#endregion

  //#region add passenger form
  AddPassengerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    age: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.max(100)])
    ),
    gender: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phonenumber: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[7-9][0-9]{9}$'),
      ])
    ),
    allocatedSeat: '',
    bookingId: 0,
  });
  //#endregion

  ////fuction to convert booking id to number
  //#region  convert to number
  convertToNumberfromstring(value: string | null): number | null {
    if (value === null) {
      return null;
    }

    const parsedValue = parseInt(value);

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
  //#region
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
  //#endregion

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
          if (res.success) {
            this.passengers = res.data;
            this.calculateCostOnAdd();
            console.log(res);
            console.log(this.passengers);
          } else {
            this.toastr.warning(res.message);
          }
        });
    } else {
      this.toastr.error('Enter Required details');
    }
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

  //all seats functions
  //#region  for seats functionality

  //seat selection after adding passengers
  //#region  changes to be mode after selecting a seat
  seatselection() {
    this.seatselectionOption = !this.seatselectionOption;

    if (this.selectedflight === null) {
      this.toastr.warning('flight not selected');
    }

    let val: number = this.selectedflight.totalNoofseats;
    for (let i = 1; i <= val / 6; i++) {
      this.rows.push(this.rowNames[i]);
    }
  }
  //#endregion

  //selected seats to display.
  //#region displaying selected seats
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
  //#endregion

  checkseatsoccupied(seat: string) {
    if (this.occupiedseatslist.includes(seat)) {
      return true;
    } else {
      return false;
    }
  }

  isseatchecked(seat: string): boolean {
    return this.occupiedseatslist.includes(seat);
  }

  isSeatOccupied(seat: string): boolean {
    return this.occupiedseatslist.includes(seat);
  }

  isSelectedSeat(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  getSeatLabel(seat: string): string {
    if (this.checkseatsoccupied(seat)) {
      return '🧑‍💼';
    } else {
      return seat;
    }
  }
  //disabling seats
  isSeatDisabled(seat: string) {
    if (this.selectedSeats.length >= 6 || this.checkseatsoccupied(seat)) {
      if (this.selectedSeats.includes(seat)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
    // return this.selectedSeats.length >= 6 || this.checkseatsoccupied(seat);
  }

  //#endregion

  //add passenger opiton
  //#region
  addPassengerOption(seat: string) {
    this.currentseat = seat;
    this.passengerAddOption = true;
  }
  //#endregion

  //#region payments navigation
  payments() {
    if (this.passengers.length === this.selectedSeats.length) {
      this.route.navigate(['/dashboard/payments', this.cost]);
    } else {
      this.toastr.warning(
        'Please add passengers for selected seats or select required no of seats. Thank You 😊'
      );
    }
  }
  //#endregion

  //#region calculating cost
  private calculateCost() {
    for (let i = 0; i < this.passengers.length; i++) {
      this.cost += this.selectedflight.basePrice;
      sessionStorage.setItem('cost', this.cost.toString());
    }
  }

  private calculateCostOnAdd() {
    // this.passengers.forEach(item => {
    this.cost += this.selectedflight.basePrice;
    sessionStorage.setItem('cost', this.cost.toString());
    // })
  }
  private calculateCostOnremove() {
    // this.passengers.forEach(item => {
    this.cost -= this.selectedflight.basePrice;
    sessionStorage.setItem('cost', this.cost.toString());
    // })
  }
  //#endregion
}
