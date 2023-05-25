import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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




  //get flights 
  getFlights():Observable<any>{
    let token = sessionStorage.getItem("Token");
    let headobj = new HttpHeaders().set("Authorization","bearer "+token);
        // debugger
    return this.http.get("https://localhost:7102/api/Flight/getFlights",{headers:headobj})
  }
}
