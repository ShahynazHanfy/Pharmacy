// import { Component, OnInit } from '@angular/core';
import { DrugService } from '../services/drug.service'
import { Drug } from '../Models/Drug'
import { Component, Input, OnInit, Inject } from '@angular/core';
import 'jspdf-autotable'
// import * as jsPDF from 'jspdf';
// import { saveAs } from 'file-saver';
import 'jspdf';
import 'jspdf-autotable';

import jsPDF from "jspdf";
import "jspdf-autotable";

// import jsPDF from "jspdf";


// declare let jsPDF;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private drugService: DrugService) { }
  Drug: Drug
  drugs: Drug[];
  SelecteDrugs: Drug[];
  cols: any[];
  exportColumns: any[];

  ngOnInit(): void {
    this.drugService.GetAll().subscribe(e => {
      this.drugs = e
      console.log(this.drugs)
    }


    )
    this.SelecteDrugs = []

    this.cols = [
      { field: 'tradeName', header: 'Code' },
      { field: 'genericName', header: 'GenericName' },
      // { field: 'category', header: 'Category' },
      // { field: 'quantity', header: 'Quantity' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    doc['autoTable'](this.exportColumns, this.drugs);
    // doc.autoTable(this.exportColumns, this.products);
    doc.save("drugs.pdf");
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.drugs);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "drugs");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}

