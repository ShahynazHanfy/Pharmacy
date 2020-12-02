import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../services/drug.service' 
import {Patient} from '../../Models/Patient'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
 patients:Patient[]
  constructor(private drugService : DrugService) { }

  ngOnInit(): void {
    this.drugService.GetAllPatients().subscribe(e=>{
      this.patients = e
    })
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert'})
    doc.save("Patients.pdf");
  }

}
