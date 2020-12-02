import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../services/drug.service'
import {UsersService} from '../../services/users.service'
import {PharmacyService} from '../../services/pharmacy.service'
import {Pharmacy} from '../../Models/Pharmacy'
import { from } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-all-pharmacies-sup-admin',
  templateUrl: './all-pharmacies-sup-admin.component.html',
  styleUrls: ['./all-pharmacies-sup-admin.component.css']
})
export class AllPharmaciesSupADMINComponent implements OnInit {
  pharmacies :Pharmacy[]
  pharmacyName:string
  loading: boolean = true;
  constructor(private pharmacyService : PharmacyService , private userService: UsersService) { }

  ngOnInit(): void {
    this.pharmacyService.GetAllPharmacies().subscribe(e=> 
    {
      this.pharmacies = e
      console.log("pharmacies..."+ e)
      
      this.pharmacies.forEach(element => {
        this.userService.GetAllUsersByPharmacyName(element.name).subscribe(e=>{
          element.users = e
          console.log("elemnt " ,element.users)
          this.loading = false;
        })    
      });


      
    })
 
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert'})
    doc.save("Pharmacies.pdf");
  }
}
