// import { Component, OnInit } from '@angular/core';
// import { Drug } from '../Models/Drug';
// import {OrderVM} from '../Models/OrderViewModel'
// import { OrderService } from '../services/order.service';
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import {DrugInEachOrder} from '../Models/DrugInEachOrder'
// @Component({
//   selector: 'app-test2',
//   templateUrl: './test2.component.html',
//   styleUrls: ['./test2.component.css'],

// })
// export class Test2Component implements OnInit {
//   dialogVisible: boolean;
//   orderVM:OrderVM[]
//   cols: any[];
//   SelecteDrugs: Drug[];
//   exportColumns: any[];
//   pharmacyLoggedInIDInlocalStorage: Number;
//     constructor(
//       private orderService: OrderService,



//     ) { 
//     this.orderVM=[]

//     }

//   ngOnInit(): void {
//     this.pharmacyLoggedInIDInlocalStorage=Number(localStorage.getItem("pharmacyLoggedInID"))
//     this.pharmacyLoggedInIDInlocalStorage=Number(this.pharmacyLoggedInIDInlocalStorage)

//     this.orderService.GetAllOrdersByPharmacySourceId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A=>{
//       this.orderVM = A //delivered from
//       console.log(this.orderVM)
//     })
//     this.cols = [
//       { field: 'pharmacyTarget', header: 'Pharmacy Target' },
//       { field: 'pendingStatus', header: 'pendingStatus' },
//       { field: 'drugName', header: 'Drug Name'},
//     ];
//     this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field}));
//     console.log("exportColumns",this.exportColumns);
//   }
//   showDialog() {
//     this.dialogVisible = true;
// }
// exportPdf() {
//   const doc = new jsPDF('p', 'pt');
//   doc['autoTable'](this.exportColumns, this.orderVM);

//   doc.save("orderVM.pdf");
// }


// exportExcel() {
//   import("xlsx").then(xlsx => {
//     const worksheet = xlsx.utils.json_to_sheet(this.orderVM);
//     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, "orderVM");
//   });
// }

// saveAsExcelFile(buffer: any, fileName: string): void {
//   import("file-saver").then(FileSaver => {
//     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     let EXCEL_EXTENSION = '.xlsx';
//     const data: Blob = new Blob([buffer], {
//       type: EXCEL_TYPE
//     });
//     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//   });
// }
// counter(i: number) {
//   return new Array(i);
// }

// }


import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { OrderService } from '../services/order.service';
import { OrderVM } from '../Models/OrderVM'

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component implements OnInit {
  pharmacyLoggedInIDInlocalStorage: Number;
  orderVM: OrderVM[]
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderVM = []
    this.pharmacyLoggedInIDInlocalStorage = Number(localStorage.getItem("pharmacyLoggedInID"))
    this.pharmacyLoggedInIDInlocalStorage = Number(this.pharmacyLoggedInIDInlocalStorage)

    this.orderService.GetAllOrdersByPharmacySourceId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
      this.orderVM = A //delivered from
      console.log(this.orderVM)
    })
  }
  exportPdf() {
    const doc = new jsPDF()
    autoTable(doc, { html: '#contentToConvert' })

    doc.save("Orders.pdf");
  }
  counter(i: number) {
    return new Array(i);
  }

}
