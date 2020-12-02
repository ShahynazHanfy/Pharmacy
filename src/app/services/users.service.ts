import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../Models/User'
import {environment} from '../../environments/environment';
import {Employee} from '../Models/Employee'



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
  })};

  getAllUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>("http://localhost:51563/api/users",this.httpHeader);
  }
  
  GetAllUsersByPharmacyName(pharmacyName):Observable<any>
  {
    return this.httpClient.get<User[]>(`${environment.getAllusersByPharmacyName}${pharmacyName}`,this.httpHeader);
  }
  GetUnregisteredUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>("http://localhost:51563/api/users/GetUnregisteredUsers",this.httpHeader);
  }
  addUser(NewUser:User)
  {
    return this.httpClient.post("http://localhost:51563/api/authenticate/register",NewUser,this.httpHeader)
  }
}
