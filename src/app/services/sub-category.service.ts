import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import {SubCategory} from '../Models/SubCategory'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {


  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"   
  })};

  GetAllSubCategories(): Observable <SubCategory[]>{
    return this.httpClient.get<SubCategory[]> (`${environment.subCategory}`,this.httpHeader) ;
  }
  GetAllActiveSubCategories(): Observable <SubCategory[]>{
    return this.httpClient.get<SubCategory[]> (`${environment.subCategoryActive}`,this.httpHeader) ;
  }

  insertSubCategory(subCategory: SubCategory): Observable <any>{
    console.log(subCategory+"d")
    return this.httpClient.post<any> (`${environment.subCategory}`,subCategory,this.httpHeader) ;
  }
  deleteSubCategory(id: number):Observable <any> {
    return this.httpClient.delete(environment.subCategory+ id);
  }
  updateSubCategory(SubCategory: SubCategory,id:number): Observable <any >{
    return this.httpClient.put<any> (`${environment.subCategory}${id}`,SubCategory,this.httpHeader) ;
  }
  getSubCategoryByID(SubCategoryId: number): Observable <SubCategory>{
    console.log(SubCategoryId+"hhhh")
    return this.httpClient.get<SubCategory> (`${environment.subCategory}${SubCategoryId}`,this.httpHeader) ;
  }

  
}
