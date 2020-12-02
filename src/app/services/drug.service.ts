import { Injectable } from '@angular/core';
// import { Drug } from '../Models/Drug';
import {Drug} from '../Models/Drug'
import {TheraGroup} from './../Models/TheraGroup'
import{TheraSubGroup} from './../Models/TheraSubGroup'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '../Models/Form';
import{Firm} from './../Models/Firm'
import{Unit} from './../Models/Unit'
import{ROAD} from './../Models/ROAD'
import{Country} from './../Models/Country'
import { map } from 'rxjs/operators';
import{Pharmacy} from '../Models/Pharmacy'
import{Pledge} from '../Models/Pledge'
import{Supplier} from '../Models/Supplier'
import { DrugDetails } from '../Models/DrugDetails';
import { DrugAndDrugDetails } from '../Models/Drugs&DrugsDetials';
import {Patient} from '../Models/Patient'

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private httpClient : HttpClient) { }
 
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, X-Requested-With"  
    
  })};

GetAll(): Observable <Drug[]>{
    return this.httpClient.get<Drug[]> (`${environment.Drug}`,this.httpHeader) ;
}

GetAllDrugsDetailsViewModel(id): Observable <DrugAndDrugDetails[]>{
  return this.httpClient.get<DrugAndDrugDetails[]> (`${environment.DrugAndDrugDetails}${id}`,this.httpHeader) ;
}

insertDrugDetailsObj(drugDetail:DrugDetails): Observable <any >{

  return this.httpClient.post<any> (`${environment.DrugDetails}`,drugDetail,this.httpHeader) ;
}

insertDrug(Drug: Drug): Observable <any >{
  console.log(Drug+"d")
  return this.httpClient.post<any> (`${environment.PostDrugName}`,Drug,this.httpHeader) ;
}
  
getDrug(id: number): Observable <Drug>{
  return this.httpClient.get<Drug> (`${environment.Drug}${id}`,this.httpHeader) ;
}

updateDrug(drug: Drug,id:number): Observable <any >{
  return this.httpClient.put<any> (`${environment.Drug}${id}`,drug,this.httpHeader) ;
}

// DeleteCustomer(id: number): Observable <Drug>{
//   return this.httpClient.get<Drug> (`${environment.DeleteCustomer}${id}`,this.httpHeader) ;
// }
deleteDrug(id: number):Observable <any> {
  return this.httpClient.delete('http://localhost:51563/api/Drugs/'+ id);

}

GetAllThera(): Observable <TheraGroup[]>{
  return this.httpClient.get<TheraGroup[]> (`${environment.Thera}`,this.httpHeader) ;
}
GetAllPatients(): Observable <Patient[]>{
  return this.httpClient.get<Patient[]> (`${environment.patient}`,this.httpHeader) ;
}

GetAllActiveThera(): Observable <TheraGroup[]>{
  return this.httpClient.get<TheraGroup[]> (`${environment.ActiveThera}`,this.httpHeader) ;
}

GetAllTheraSub(): Observable <TheraSubGroup[]>{
  return this.httpClient.get<TheraSubGroup[]> (`${environment.TheraSub}`,this.httpHeader) ;
}
getSubByGrpID(Grpid: Number): Observable <TheraSubGroup[]>{
  return this.httpClient.get<TheraSubGroup[]> (`${environment.therasubBYgroup}${Grpid}`,this.httpHeader) ;
}
getGrpByGrpID(Grpid: Number): Observable <TheraGroup>{
  return this.httpClient.get<TheraGroup> (`${environment.theraById}${Grpid}`,this.httpHeader) ;
}

GetAllForms(): Observable <Form[]>{
  return this.httpClient.get<Form[]> (`${environment.Forms}`,this.httpHeader) ;
}

GetAllFirms(): Observable <Firm[]>{
  return this.httpClient.get<Firm[]> (`${environment.Firm}`,this.httpHeader) ;
}

GetAllActiveUnits(): Observable <Unit[]>{
  return this.httpClient.get<Unit[]> (`${environment.ActiveUnit}`,this.httpHeader) ;
}

GetAllActiveCountry(): Observable <Country[]>{
  return this.httpClient.get<Country[]> (`${environment.ActiveCountry}`,this.httpHeader) ;
}
GetAllCountry(): Observable <Country[]>{
  return this.httpClient.get<Country[]> (`${environment.Country}`,this.httpHeader) ;
}
GetAllROAD(): Observable <ROAD[]>{
  return this.httpClient.get<ROAD[]> (`${environment.ROAD}`,this.httpHeader) ;
}
GetAllActiveROAD(): Observable <ROAD[]>{
  return this.httpClient.get<ROAD[]> (`${environment.ActiveROAD}`,this.httpHeader) ;
}

postFile(fileToUpload: File): Observable<boolean> {
  const endpoint = 'http://localhost:51563/api/drugs/api/Drugs/UploadImage';
  const formData: FormData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  return this.httpClient
    .post(endpoint, formData).pipe(
    map(() => { return true; }));
}

getDrugByID(drugID: number): Observable <Drug>{
  console.log(drugID+"hhhh")
  return this.httpClient.get<Drug> (`${environment.Drug}${drugID}`,this.httpHeader) ;
}

getProductsSmall() {
  return this.httpClient.get<any>('assets/products-small.json')
  .toPromise()
  .then(res => <Drug[]>res.data)
  .then(data => { return data; });
}

getProducts() {
  return this.httpClient.get<any>('assets/products.json')
  .toPromise()
  .then(res => <Drug[]>res.data)
  .then(data => { return data; });
}


GetAllPledges(): Observable <Pledge[]>{
  return this.httpClient.get<Pledge[]> (`${environment.pledge}`,this.httpHeader) ;
}


GetAllSuppliers(): Observable <Supplier[]>{
  return this.httpClient.get<Supplier[]> (`${environment.supplier}`,this.httpHeader) ;
}
// getProductsWithOrdersSmall() {
//   return this.httpClient.get<any>('assets/products-orders-small.json')
//   .toPromise()
//   .then(res => <Product[]>res.data)
//   .then(data => { return data; });
// }

// generatePrduct(): Drug {
//   const product: Drug =  {
//       id: this.generateId(),
//       name: this.generateName(),
//       description: "Product Description",
//       price: this.generatePrice(),
//       quantity: this.generateQuantity(),
//       category: "Product Category",
//       inventoryStatus: this.generateStatus(),
//       rating: this.generateRating()
//   };

//   product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
//   return product;
// }

generateId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
}

// generateName() {
//   return this.productNames[Math.floor(Math.random() * Math.floor(30))];
// }

generatePrice() {
  return Math.floor(Math.random() * Math.floor(299)+1);
}

generateQuantity() {
  return Math.floor(Math.random() * Math.floor(75)+1);
}

// generateStatus() {
//   return this.status[Math.floor(Math.random() * Math.floor(3))];
// }

generateRating() {
  return Math.floor(Math.random() * Math.floor(5)+1);
}


}
