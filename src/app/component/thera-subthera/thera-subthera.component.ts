import { Component, OnInit } from '@angular/core';
import { DrugService } from '../../services/drug.service'
import { TheraGroup } from '../../Models/TheraGroup'
import { TheraSubGroup } from '../../Models/TheraSubGroup'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-thera-subthera',
  templateUrl: './thera-subthera.component.html',
  styleUrls: ['./thera-subthera.component.css']
})
export class TheraSubtheraComponent implements OnInit {

  theraGrp: TheraGroup[]
  theraGrpName: string
  loading: boolean = true;
  theraSub: TheraSubGroup[]
  theraGrpId: Number = 0
  theraSubGrpId: Number

  constructor(private drugService: DrugService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.theraSubGrpId = Number(this.theraSubGrpId)

    this.drugService.GetAllThera().subscribe(e => {
      this.theraGrp = e
      this.loading = false;

    })
    this.drugService.GetAllTheraSub().subscribe(e => {
      this.theraSub = e
      console.log(this.theraSub)
      this.loading = false;
      this.theraSub.forEach(element => {
        this.theraGrpId = element.theraGroupID
        this.drugService.getGrpByGrpID(this.theraGrpId).subscribe(e => {
          console.log(e)
          element.theraGrpName = e.name
          console.log(element.theraGrpName)
        })
      }
      );
    })
    this.primengConfig.ripple = true;
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert' })
    doc.save("TheraSubGrp.pdf");
  }
}
