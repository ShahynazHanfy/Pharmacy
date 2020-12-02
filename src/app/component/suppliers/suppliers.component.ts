import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../services/drug.service' 
import {Supplier} from '../../Models/Supplier'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[]
  constructor(private drugService : DrugService) { }

  ngOnInit(): void {
    this.drugService.GetAllSuppliers().subscribe(e=>{
      this.suppliers= e
    })
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert'})
    doc.save("Suppliers.pdf");
  }

}
