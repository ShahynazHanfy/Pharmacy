import { Component, OnInit } from '@angular/core';
import { DrugService } from '../../services/drug.service'
import { UsersService } from '../../services/users.service'
import { PharmacyService } from '../../services/pharmacy.service'
import { Pharmacy } from '../../Models/Pharmacy'
import { from } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-all-pharmacies-sup-admin',
  templateUrl: './all-pharmacies-sup-admin.component.html',
  styleUrls: ['./all-pharmacies-sup-admin.component.css']
})
export class AllPharmaciesSupADMINComponent implements OnInit {
  pharmacies: Pharmacy[]
  pharmacy: Pharmacy
  pharmacyName: string
  loading: boolean = true;
  displayModal: boolean;

  constructor(private pharmacyService: PharmacyService, private userService: UsersService) { }

  ngOnInit(): void {
    this.pharmacy = { id: 0, address: '', email: '', isActive: true, location: '', name: '', pharmacyType: '', telephone: '', users: [] }
    this.pharmacyService.GetAllPharmacies().subscribe(e => {
      this.pharmacies = e
      this.pharmacies.forEach(element => {
        this.userService.GetAllUsersByPharmacyName(element.name).subscribe(e => {
          element.users = e
          this.loading = false;
        })
      });
    })

  }
  showModalDialog() {
    this.displayModal = true;
    this.ngOnInit()
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert' })
    doc.save("Pharmacies.pdf");
  }
  addNewPharmacy() { 

    console.log(this.pharmacy)
    this.pharmacyService.postPharmacy(this.pharmacy).subscribe(e=>{
      // console.log(e)
    })
    this.pharmacyService.GetAllPharmacies().subscribe(e => {
      this.pharmacies = e
      this.pharmacies.forEach(element => {
        this.userService.GetAllUsersByPharmacyName(element.name).subscribe(e => {
          element.users = e
          this.loading = false;
        })
      });
    })
  }
}
