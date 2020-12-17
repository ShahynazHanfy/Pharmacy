import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service'
import {Order} from '../../Models/Order'
import {Pharmacy} from '../../Models/Pharmacy'
import {PharmacyService} from '../../services/pharmacy.service'
import {DrugService} from '../../services/drug.service'
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders:Order []
  pharmacySouceName : string
  pharmacyTargetName : string
  loading: boolean;
  suppName : string

  constructor(private orderService : OrderService ,private pharmacyService : PharmacyService,
    private drugService:DrugService) { }

  ngOnInit(): void {
    this.orderService.GetAll().subscribe(orders=>{
      this.orders = orders
      console.log(this.orders)

      this.orders.forEach(element => {
        if(element.pharmacySourceID !=0){
          this.pharmacyService.getPharmacyById(element.pharmacySourceID).subscribe(e=>{
            // this.pharmacySouceName = e.name
            element.pharmacySouceName = e.name
     
          })
        }
         if(element.pharmacyTargetID !=0){
          this.pharmacyService.getPharmacyById(element.pharmacyTargetID).subscribe(e=>{
            // this.pharmacyTargetName = e.name
            element.pharmacyTargetName = e.name
         
          })
        } 
        if(element.supplierID != null){
            this.drugService.getSuppByID(element.supplierID).subscribe(e=> {
             element.supplierName = e.name
              // this.suppName = e.name
              // this.orders.push(this.suppName)
           
            })
            
        }
        if(element.patientId != null){
          this.drugService.getPatientsByID(element.patientId).subscribe(e=> {
            console.log(e)
           element.patientName = e.name
            // this.suppName = e.name
            
            // this.orders.push(this.suppName)
         
          })
          
      }

        
      });
          this.loading = false;

    })

  }

}
