import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getUser } from '../Models/GetUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


//#region add flight
  AddFlight(responce:any):Observable<any>
  {
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    debugger
    return this.http.post('https://localhost:7102/api/Flight/AddFlight',responce,{headers:headobj})
  }

  //#endregion


//#region delete flight

deleteflight(id:number):Observable<any>
{
  let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
  const flightid = new HttpParams().set('id', id);
  debugger
  return this.http.delete('https://localhost:7102/api/Flight/deleteFlight' ,{headers:headobj , params:flightid})
}

//#endregion



//#region edit flight

updateflight(responce:any):Observable<any>
    {
      let token = sessionStorage.getItem("Token");
      let headobj = new HttpHeaders().set("Authorization","bearer "+token);
       debugger
       return this.http.put('https://localhost:7102/api/Flight/UpdateFlights',responce,{headers:headobj})
    }

getflightbyid(id:number):Observable<any>{
  let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
  const flightid = new HttpParams().set('id', id);
  debugger
  return this.http.get('https://localhost:7102/api/Flight/getflightsbyid' ,{headers:headobj , params:flightid})
}
private flightbyidvalue:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setFlightvalue(data:any)
  {
    this.flightbyidvalue.next(data);
  }

  getFlightvalue():Observable<any>
  {
    // debugger
    return this.flightbyidvalue.asObservable();
  }

  //#endregion
  
 
//#region get flights


  getFlights():Observable<any>{
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
        // debugger
    return this.http.get("https://localhost:7102/api/Flight/getFlights",{headers:headobj})
  }

  // private flights:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // setAllFlights(data:any)
  // {
  //   this.flights.next(data);
  // }

  // getallflights():Observable<any>
  // {
  //   // debugger
  //   return this.flights.asObservable();
  // }
  
//#endregion


///user crud by admin///---------------------------------------------------------------------------

//#region get users

  getusers():Observable<any>
  {
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    debugger
    return this.http.get("https://localhost:7102/api/Admin/GetUsers",{headers: headobj});
  }
//#endregion


//#region update user

updateuser(responce:any):Observable<any>
{
  let token = sessionStorage.getItem("Token");
  let headobj = new HttpHeaders().set("Authorization","bearer "+token);

  return this.http.post("https://localhost:7102/api/Admin/updateUser",responce,{headers:headobj});
}
//#endregion

//#region delete User
deleteuser(id:number):Observable<any>
{
  let token = sessionStorage.getItem("Token");
  let headObj = new HttpHeaders().set("Authorization","bearer "+ token);
  let userId = new HttpParams().set("id",id);

  return this.http.delete("https://localhost:7102/api/Admin/deleteUser",{headers:headObj, params:userId});
}
//#endregion


/////bookinglist/////-------------------------------------------------------------------------------

//#region get bookings by flight id

getbookindbyflightId(id:number):Observable<any>
{
  let token = sessionStorage.getItem("Token");
  let headObj = new HttpHeaders().set("Authorization", "bearer "+token);
  let flightid = new HttpParams().set("id",id);

  return this.http.get("https://localhost:7102/api/Booking/getbookingsbyflightId",{headers:headObj,params:flightid});
}

//#endregion

//#region get passengers by booking id
getpassengersbybookingid(id:number):Observable<any>
{
  let token = sessionStorage.getItem('Token');
  let headObj = new HttpHeaders().set("Authorization","bearer "+token);
  let bookingid = new HttpParams().set('id',id);

  return this.http.get('https://localhost:7102/api/Passenger/GetPassengersByBookingid',{headers:headObj,params:bookingid})
}
//#endregion


//#region delete passenger
deletepassenger(id:number):Observable<any>
{
  let token = sessionStorage.getItem('Token');
  let headObj = new HttpHeaders().set("Authorization","bearer "+token);
  let passengerid = new HttpParams().set('id',id);
  debugger
  return this.http.delete('https://localhost:7102/api/Passenger/RemovePassenger',{headers:headObj,params:passengerid})
}
//#endregion

}
