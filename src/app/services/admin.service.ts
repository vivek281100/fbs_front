import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  //add flights
  AddFlight(responce:any):Observable<any>
  {
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
    debugger
    return this.http.post('https://localhost:7102/api/Flight/AddFlight',responce,{headers:headobj})
  }

    //#region edit flight

    updateflight(responce:any):Observable<any>
    {
      let token = sessionStorage.getItem("Token");
      let headobj = new HttpHeaders().set("Authorization","bearer "+token);
       debugger
       return this.http.put('https://localhost:7102/api/Flight/UpdateFlights',responce,{headers:headobj})
    }
    //#endregion





//delete flight
deleteflight(id:number):Observable<any>
{
  let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
  const flightid = new HttpParams().set('id', id);
  debugger
  return this.http.delete('https://localhost:7102/api/Flight/deleteFlight' ,{headers:headobj , params:flightid})
}



//edit flight


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

  //get flights 
  getFlights():Observable<any>{
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
        // debugger
    return this.http.get("https://localhost:7102/api/Flight/getFlights",{headers:headobj})
  }

  private fligts:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setAllFlights(data:any)
  {
    this.flightbyidvalue.next(data);
  }

  getallflights():Observable<any>
  {
    // debugger
    return this.flightbyidvalue.asObservable();
  }

}
