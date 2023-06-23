import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../Models/Flight';
import { Payment } from '../Models/Payment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //#region for search flights and display

  onBooking(responce: any): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.post(
      'https://localhost:7102/api/Flight/getflightsbyfromandto',
      responce,
      { headers: headobj }
    );
  }

  //flights stored here after search.
  private flights: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setFlights(data: any) {
    this.flights.next(data);
    // console.log("flights from get data : "+this.flights.value)
    // debugger
    // console.log(this.flights)
  }

  getFlights(): Observable<any> {
    // debugger
    return this.flights.asObservable();
  }

  //#endregion

  //#region booking start. on selecting flight

  onSelectFlights(responce: any): Observable<any> {
    // debugger
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // debugger
    return this.http.post(
      'https://localhost:7102/api/Booking/AddBookingasync',
      responce,
      { headers: headobj }
    );
  }

  //#endregion

  //#region get flight by id
  getflightbyId(fid: number): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let id = new HttpParams().set('id', fid);
    return this.http.get('https://localhost:7102/api/Flight/getflightsbyid', {
      headers: headobj,
      params: id,
    });
  }
  //#endregion

  // get flight by booking id.
  //#region  Get Flight By Booking Id
  getflightbyBookingId(bid: number): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let id = new HttpParams().set('id', bid);
    return this.http.get(
      'https://localhost:7102/api/Flight/getFlightByBookingid',
      {
        headers: headobj,
        params: id,
      }
    );
  }
  //#endregion

  //#region saving the selected flight
  private selectedflight: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getselectedflight(): Observable<Flight> {
    return this.selectedflight.asObservable();
  }
  setSelectedFlight(obj: Flight) {
    this.selectedflight.next(obj);
  }
  //#endregion

  //#region remove booking when passenger booking is canceled
  onBookingCancel(responce: any): Observable<any> {
    // debugger
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let id = new HttpParams().set('id', responce);
    // debugger
    return this.http.delete(
      'https://localhost:7102/api/Booking/DeleteBooking',
      { headers: headobj, params: id }
    );
  }
  //#endregion

  //#region get passengers by booking id
  getpassengersbybookingid(id: any): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headObj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let bookingid = new HttpParams().set('id', id);

    return this.http.get(
      'https://localhost:7102/api/Passenger/GetPassengersByBookingid',
      { headers: headObj, params: bookingid }
    );
  }
  //#endregion

  //#region Adding passengers based on booking id and user
  OnAddPassenger(responce: any): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.post(
      'https://localhost:7102/api/Passenger/AddPassenger',
      responce,
      { headers: headobj }
    );
  }
  //#endregion

  //#region delete passenger based on passenger id
  OndeletePassenger(responce: any): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let id = new HttpParams().set('id', responce);

    // debugger;
    return this.http.delete(
      'https://localhost:7102/api/Passenger/RemovePassenger',
      { headers: headobj, params: id }
    );
  }
  //#endregion

  //#region get user details

  getuserinfo(): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);

    // debugger
    return this.http.get('https://localhost:7102/api/User/getUser', {
      headers: headobj,
    });
  }
  //#endregion

  //#region update user
  updateuser(responce: any): Observable<any> {
    debugger;
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);

    // debugger
    return this.http.put(
      'https://localhost:7102/api/User/Updateusers',
      responce,
      { headers: headobj }
    );
  }
  //#endregion

  //change password
  //#region change pasword
  changepassword(responce: any): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headobj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // let passwordparam = new HttpParams().set("password",responce);
    console.log(responce);
    // debugger;
    return this.http.put(
      'https://localhost:7102/api/User/UpdatePassword',
      responce,
      { headers: headobj }
    );
  }
  //#endregion

  //addpayment
  //#region add payment
  addpayment(responce: Payment): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headObj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // debugger;
    return this.http.post(
      'https://localhost:7102/api/Payment/AddPayment',
      responce,
      { headers: headObj }
    );
  }
  //#endregion

  //get bookings by userId
  //#region  bookings by user id
  getbookings(): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headObj = new HttpHeaders().set('Authorization', 'bearer ' + token);

    return this.http.get(
      'https://localhost:7102/api/Booking/GetBookingsbyUser',
      { headers: headObj }
    );
  }
  //#endregion

  //update booking status
  //#region update booking status
  updatebookingstatus(id: number): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headObj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    // let id = new HttpParams().set('id', bid);
    // debugger;
    return this.http.put(
      'https://localhost:7102/api/Booking/updateBookingStatus',
      id,
      { headers: headObj }
    );
  }
  //#endregion

  //get payment by booking id.
  //#region get payments by booking id
  paymentbybookingid(bid: number): Observable<any> {
    let token = sessionStorage.getItem('Token');
    let headObj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    let id = new HttpParams().set('id', bid);
    // debugger;
    return this.http.get(
      'https://localhost:7102/api/Payment/getpaymentbybookingId',
      { headers: headObj, params: id }
    );
  }
  //#endregion
}
