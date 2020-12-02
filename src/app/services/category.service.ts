import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Category} from './../Models/Category'
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};

  
GetAllCategories(): Observable <Category[]>{
    return this.httpClient.get<Category[]> (`${environment.category}`,this.httpHeader) ;
}
insertCategory(category: Category): Observable <any>{
  console.log(category+"d")
  return this.httpClient.post<any> (`${environment.category}`,category,this.httpHeader) ;
}

deleteCategory(id: number):Observable <any> {
  return this.httpClient.delete(environment.category+ id);
}

updateCategory(category: Category,id:number): Observable <any >{
  return this.httpClient.put<any> (`${environment.category}${id}`,category,this.httpHeader) ;
}

getCategoryByID(categoryId: number): Observable <Category>{
  console.log(categoryId+"hhhh")
  return this.httpClient.get<Category> (`${environment.category}${categoryId}`,this.httpHeader) ;
}



}
