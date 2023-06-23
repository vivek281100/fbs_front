import { Flight } from './Flight';
import { passenger } from './Passenger';

export class Booking {
  id!: number;
  status: boolean = true;
  bookingdatetime!: Date;
  flightId: string = '';
}

export class BookingListuser {
  id!: number;
  status: boolean = true;
  bookingdatetime!: Date;
  flightId: string = '';
  Flight!: Flight;
  Passengers!: passenger[];
}
