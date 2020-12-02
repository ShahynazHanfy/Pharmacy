import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../Models/Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Pharmacy} from '../Models/Pharmacy'
@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient : HttpClient) { }
 
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"   
  })};
  GetAllPharmacies(): Observable <Pharmacy[]>{
    return this.httpClient.get<Pharmacy[]> (`${environment.pharmacy}`,this.httpHeader) ;
  }


  getPharmacyById(id: Number): Observable <Pharmacy>{
    return this.httpClient.get<Pharmacy> (`${environment.pharmacy}${id}`,this.httpHeader) ;
  }
}
