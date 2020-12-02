import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import {Firm} from '../Models/Firm'

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"   
  })};

  GetAllFirms(): Observable <Firm[]>{
    return this.httpClient.get<Firm[]> (`${environment.firms}`,this.httpHeader) ;
  }
  
  insertFirm(Firm: Firm): Observable <any >{
    console.log(Firm)
    return this.httpClient.post<any> (`${environment.firms}`,Firm,this.httpHeader) ;
  }
  GetActiveFirms(): Observable <Firm[]>{
    return this.httpClient.get<Firm[]> (`${environment.firmsActive}`,this.httpHeader) ;
  }

}
