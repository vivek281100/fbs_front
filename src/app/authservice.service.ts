import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  
  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:7102/api/User';

  RegisterUser(inputdata:any):Observable<any>{
     debugger
    return this.http.post("https://localhost:7102/api/User/registeruser",inputdata)
  }

  Login(inputdata:any):Observable<any>{
    // debugger
    return this.http.post("https://localhost:7102/api/User/UserLogin",inputdata);
  }
  // GetUserbyCode(id:any){
  //   return this.http.get(this.apiurl+'/'+id);
  // }
  // Getall(){
  //   return this.http.get(this.apiurl);
  // }
  isloggedin(){
    return sessionStorage.getItem('Token')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
