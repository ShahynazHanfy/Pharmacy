import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../../services/pharmacy.service'
import {Pharmacy} from '../../Models/Pharmacy'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-pharmacy-pledge',
  templateUrl: './pharmacy-pledge.component.html',
  styleUrls: ['./pharmacy-pledge.component.css']
})
export class PharmacyPledgeComponent implements OnInit {

  pharmacies:Pharmacy[]
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
    // this.userService.GetAllUsersByPharmacyName()
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert'})
    doc.save("Pharmacies.pdf");
  }


}


