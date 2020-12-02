import { Injectable } from '@angular/core';
import{Order} from '../Models/Order'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {OrderVM} from '../Models/OrderVM'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"   
  })};

  GetAll(): Observable <Order[]>{
    return this.httpClient.get<Order[]> (`${environment.order}`,this.httpHeader) ;
}
GetAllOrdersByPharmacySourceId(pharmacyId:Number){
  return this.httpClient.get<OrderVM[]> (`${environment.orderViewModelByPharmacySource}${pharmacyId}`,this.httpHeader) ;
}

GetAllOrdersByPharmacyTargetId(pharmacyId:Number){
  return this.httpClient.get<OrderVM[]> (`${environment.orderViewModelByPharmacyTarget}${pharmacyId}`,this.httpHeader) ;
}
UpdatePendingStatus(orderId:Number) {
  return this.httpClient.get<OrderVM[]> (`${environment.orderViewModelPutPendingStatus}${orderId}`,this.httpHeader) ;
}
insertOrder(Order: Order): Observable <any >{
  console.log(Order+"d")
  return this.httpClient.post<any> (`${environment.order}`,Order,this.httpHeader) ;
}
SoftDeleteOrder(orderId: Number): Observable <any >{
  return this.httpClient.put<any> (`${environment.SoftDeleteorder}${orderId}`,this.httpHeader) ;
}
}
