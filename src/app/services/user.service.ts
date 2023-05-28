import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }



  //#region for search flights and display

  onBooking(responce:any):Observable<any>
  {
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    return this.http.post('https://localhost:7102/api/Flight/getflightsbyfromandto',responce, {headers: headobj});
  }
  //#endregion

  //flights stored here after search.
  private flights:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setFlights(data:any)
  {
   
    this.flights.next(data);
    // console.log("flights from get data : "+this.flights.value)
    // debugger
    // console.log(this.flights)
  }

  getFlights():Observable<any>
  {
    // debugger
    return this.flights.asObservable();
  }

  
  //#endregion

  //#region booking start. on selecting flight

  onSelectFlights(responce:any):Observable<any>
  {
    debugger
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    debugger
    return this.http.post('https://localhost:7102/api/Booking/AddBookingasync',responce, {headers: headobj});
  }

  //#endregion

  //#region remove booking when passenger booking is canceled
  onBookingCancel(responce:any):Observable<any>
  {
    debugger
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    // var id = sessionStorage.getItem('bookingid');
    debugger
    return this.http.post('https://localhost:7102/api/Booking/DeleteBooking',responce ,{headers: headobj});
  }
  //#endregion

    //#region Adding passengers based on booking id and user
    OnAddPassenger(responce:any):Observable<any>
    {
      let token = sessionStorage.getItem("Token");
      let headobj = new HttpHeaders().set("Authorization","bearer "+token);
      return this.http.post('https://localhost:7102/api/Passenger/AddPassenger',responce,{headers:headobj})
    }
    //#endregion

    //#region delete passenger based on passenger id
      OndeletePassenger(responce:any):Observable<any>
      {
        let token = sessionStorage.getItem("Token");
        let headobj = new HttpHeaders().set("Authorization","bearer "+token);
        
        debugger
        return this.http.post('https://localhost:7102/api/Passenger/RemovePassenger',responce ,{headers: headobj}); 
      }
    //#endregion

  }
