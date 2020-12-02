import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Form} from '../Models/Form'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"   
  })};

  GetAllForms(): Observable <Form[]>{
    return this.httpClient.get<Form[]> (`${environment.form}`,this.httpHeader) ;
  }
  GetAllActiveForms(): Observable <Form[]>{
    return this.httpClient.get<Form[]> (`${environment.ActiveForms}`,this.httpHeader) ;
  }
  
  
}
