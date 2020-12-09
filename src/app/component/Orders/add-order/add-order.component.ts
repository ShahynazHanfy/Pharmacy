import { Component, OnInit } from '@angular/core';
import { Drug } from '../../../Models/Drug'
import { DrugService } from '../../../services/drug.service'
import { PrimeNGConfig } from 'primeng/api';
import { Order } from '../../../Models/Order'
import { OrderService } from '../../../services/order.service'
import { error } from '@angular/compiler/src/util';
import { OrderDetails } from '../../../Models/OrderDetails'
import { Pharmacy } from 'src/app/Models/Pharmacy';
import { Pledge } from 'src/app/Models/Pledge';
import { Supplier } from 'src/app/Models/Supplier';
import { PharmacyService } from '../../../services/pharmacy.service'
import { DrugDetails } from '../../../Models/DrugDetails'
import { OrderVM } from 'src/app/Models/OrderVM';
import { DrugInEachOrder } from '../../../Models/DrugInEachOrder'
import { TreeNode } from 'primeng/api'
import { NodesService } from '../../../services/nodes.service';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Patient } from '../../../Models/Patient'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
;


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  providers: [DialogService, MessageService],
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  ExistDrugs: Drug[];
  drug: Drug
  drug1: Drug
  DrugAdded: Drug[]
  Orders: Order[]
  order: Order
  drugDetailsNeeded: OrderDetails[];
  orderDetailObj: OrderDetails;
  newOrder: Order
  newOrderDetails: OrderDetails[]
  selectedDrug: Drug
  orderDetails: OrderDetails[]
  pharmacy: Pharmacy[]
  pledges: Pledge[]
  supplier: Supplier[]
  selectedDrugName: string
  selectedsource: any = null
  selectedTarget: any = null
  drugDetailsObj: DrugDetails
  pharmacyLoggedInIDInlocalStorage: Number
  pharmacyObj: Pharmacy
  pharmacyName: string
  orderVM: OrderVM[]
  orderVMObj: OrderVM
  patients: Patient[]
  drugInEachOrder: DrugInEachOrder[]
  orderVM2: OrderVM[]
  mainPharmacyDrugs: Drug[]


  DrugExistAfterElementDeleted: Drug[]
  displayBasic2: boolean;
  constructor(private drugService: DrugService,
    private nodeService: NodesService,
    private orderService: OrderService,
    private pharmacyService: PharmacyService,
    private routee: Router,
  ) {
    this.orderDetails = []
    this.pharmacy = []
    this.orderVM = []
    this.orderVM2 = []
    this.DrugAdded = []
    this.newOrderDetails = []
    this.DrugExistAfterElementDeleted = []
    this.drugService.GetAll().subscribe(drugs => {
      this.ExistDrugs = drugs, 
      console.log("exist drug",this.ExistDrugs)
      for (var i = 0, len = this.orderDetails.length; i < len; i++) { 
        for (var j = 0, len2 = this.ExistDrugs.length; j < len2; j++) { 
            if (this.orderDetails[i].drugId === this.ExistDrugs[j].id) {
              this.ExistDrugs.splice(j, 1);
                len2=this.ExistDrugs.length;
            }
        }
    }
    });
  }
  ngOnInit() {
    this.order = {
      code: '', comments: '', date: new Date(), description: '', number: 0,
      pharmacyLoggedInID: 0, pharmacySourceID: 0, pharmacyTargetID: 0,
      pledgeID: 0, supplierID: 0, orderDetailList: [], id: 0, pendingStatus: true, patientId: 0, IsDeleted: false

    }


    this.drugDetailsObj = {
      IsActive: true, IsChecked: true, barCode: '', code: '', exp_Date: new Date(), id: 0, license: '', pack: '', price: 2,
      prod_Date: new Date(), quentity: 20, reOrderLevel: '', size: null, strength: '', drugID: 0, pharmacyLoggedInID: 0
    }
    this.newOrder = {
      code: '', comments: '', date: new Date(), description: '', number: 0, pharmacyTargetID: 0, pharmacySourceID: 0,
      pharmacyLoggedInID: 0,
      pledgeID: 0, supplierID: 0, orderDetailList: [], id: 0, pendingStatus: true, patientId: 0, IsDeleted: false

    }
    this.orderDetailObj = {
      quentityInEachOrder: 0, price: 0, orderId: 0, drugId: 0, exp_Date: new Date(), prod_Date: new Date(), tradeName: '', img: ''
    }
    this.pharmacyService.GetAllPharmacies()
      .subscribe(pharmacy => {
        this.pharmacy = pharmacy
        console.log("pharmacies" + this.pharmacy)
      })


    this.drugService.GetAllPledges().subscribe(pledge => {
      this.pledges = pledge
    })
    this.drugService.GetAllSuppliers().subscribe(supplier => {
      this.supplier = supplier
    })
    this.pharmacyLoggedInIDInlocalStorage = Number(localStorage.getItem("pharmacyLoggedInID"))

    this.pharmacyLoggedInIDInlocalStorage = Number(this.pharmacyLoggedInIDInlocalStorage)

    this.orderService.GetAllOrdersByPharmacySourceId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
      this.orderVM = A //delivered from
    })
    this.orderService.GetAllOrdersByPharmacyTargetId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
      this.orderVM2 = A //sent to 
      console.log("this is vm2www" + this.orderVM2 + A)
    })
    this.drugService.GetAllPledges().subscribe(pledges => {
      this.pledges = pledges
      console.log(this.pledges)
    })
    this.drugService.GetAllPatients().subscribe(e => {
      this.patients = e
    })
    this.pharmacyService.getPharmacyById(this.pharmacyLoggedInIDInlocalStorage)
      .subscribe(d => {
        this.pharmacyObj = d
        console.log(this.pharmacyObj)
        this.pharmacyName = this.pharmacyObj.name
        console.log(this.pharmacyName)
      })
    this.drugService.GetAll()
      .subscribe(drugs => {
        this.ExistDrugs = drugs,
          console.log(drugs)
      }
        , error => {
          console.log(error);
        });

    console.log(this.DrugExistAfterElementDeleted)
  }


  saveDrug(id) {
    console.log(id)
    this.drugService.getDrugByID(id).subscribe(drug => {
      this.drug = drug;
      console.log(this.drug)
      this.DrugAdded.push(drug)
    })
    // this.drug.IsChecked = !this.drug.IsChecked
  }
  deleteFromAddedList(id) {
    console.log(id)
    this.drugService.getDrugByID(id).subscribe(drug => {
      this.drug1 = drug
      console.log(this.drug1)
      var index = this.DrugAdded.indexOf(this.drug1);
      console.log(this.DrugAdded.indexOf(this.drug1))
      if (index > -1) {

        this.DrugAdded.splice(index, 1);
      }
    })
  }
  ReloadPage() {

    console.log("hello")
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  //   saveOrder(){
  //     // console.log(this.DrugAdded)
  //     // this.order.number=Number(this.order.number);
  //     for(var i=0;i<  this.DrugAdded.length;i++)
  //     {
  //        this.orderDetailObj = {
  //       drugId: this.DrugAdded[i].id,
  //       prod_Date:this.DrugAdded[i].prod_Date,
  //       price: this.DrugAdded[i].price,
  //       exp_Date:this.DrugAdded[i].exp_Date,
  //       quentity:this.DrugAdded[i].quentity,
  //       orderId:this.order.id
  //       };
  //       this.order.orderDetailList.push(this.orderDetailObj);
  //     }



  // //this.order.orderDetailList=this.DrugAdded
  //     // console.log(this.DrugAdded)
  //     console.log(this.order)
  //     this.orderService.insertDrug(this.order).subscribe(d=>{
  //       console.log(d)
  //     })
  //   }
  changeEvent() {
    console.log(this.selectedsource)

  }

  eventForPharmacy() {
    console.log(this.selectedsource)
    console.log(this.pharmacyLoggedInIDInlocalStorage)
  }

  saveOrderList() {
    this.orderDetailObj.quentityInEachOrder = Number(this.orderDetailObj.quentityInEachOrder)
    this.order.pharmacyLoggedInID = this.pharmacyLoggedInIDInlocalStorage
    this.order.pharmacyLoggedInID = Number(this.order.pharmacyLoggedInID)
    this.order.patientId = Number(this.order.patientId)

    this.order.pharmacyTargetID = Number(this.order.pharmacyTargetID)
    this.order.supplierID = Number(this.order.supplierID)
    this.order.pledgeID = Number(this.order.pledgeID)
    this.order.number = Number(this.order.number)
    if (this.selectedsource == 'Pharmacy') {
      console.log("pharmacy")
      this.order.pharmacySourceID = this.pharmacyLoggedInIDInlocalStorage
    }
    this.order.orderDetailList = this.orderDetails

    this.orderService.insertOrder(this.order).subscribe(order => {
      console.log(order)
      this.orderService.GetAllOrdersByPharmacySourceId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
        this.orderVM = A //delivered from
        this.routee.navigate(['home/showdrug'])
      })
    })

    console.log("ooorder", this.order)
  }
  DeleteOrder(orderID: Number) {
    console.log(orderID)
    this.orderService.SoftDeleteOrder(orderID).subscribe(e => {
      console.log(e)
      this.orderService.GetAllOrdersByPharmacyTargetId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
        this.orderVM2 = A //sent to 
        console.log("this is vm2www" + this.orderVM2 + A)
      })
    })
  }
  SaveToList() {
    this.orderDetailObj.drugId = this.selectedDrug.id
    this.orderDetailObj.img = this.selectedDrug.img
    this.orderDetailObj.quentityInEachOrder = Number(this.orderDetailObj.quentityInEachOrder)
    this.orderDetailObj.price = Number(this.orderDetailObj.price)
    this.orderDetailObj.tradeName = this.selectedDrug.tradeName
    this.orderDetails.push(this.orderDetailObj)
    this.drugService.GetAll()
      .subscribe(d => {
        this.ExistDrugs = d
      })
    this.orderDetailObj = {
      quentityInEachOrder: 0, price: 0, orderId: 0, drugId: 0, exp_Date: new Date(), prod_Date: new Date(), img: '', tradeName: ''
    }
    this.drugService.GetAll().subscribe(drugs => {
      this.ExistDrugs = drugs
      console.log("exist drug",this.ExistDrugs)
      for (var i = 0, len = this.orderDetails.length; i < len; i++) { 
        for (var j = 0, len2 = this.ExistDrugs.length; j < len2; j++) { 
            if (this.orderDetails[i].drugId === this.ExistDrugs[j].id) {
              this.ExistDrugs.splice(j, 1);
                len2=this.ExistDrugs.length;
            }
        }
    }
    });
    this.displayBasic2 = false
  }

  UpdatePendingStatus(orderId: Number) {
    this.orderService.UpdatePendingStatus(orderId).subscribe(A => {
      console.log(A)
    })
    this.orderService.GetAllOrdersByPharmacyTargetId(this.pharmacyLoggedInIDInlocalStorage).subscribe(A => {
      A.forEach(element => {
        if (element.isDeleted == false) {
          this.orderVM2.push(element)
        }
      });
      // this.orderVM2 = A // List in (sent to) tab 
    })


  }

  deleteDrugFromList(drugDetails) {
    this.orderDetails.splice(this.orderDetails.indexOf(drugDetails), 1);
  }




}
