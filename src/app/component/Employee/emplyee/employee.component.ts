import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import {EmployeesService} from '../../../services/employees.service'
import {Pharmacy} from '../../../Models/Pharmacy'
import {DrugService} from '../../../services/drug.service'
import {MessageService} from 'primeng/api';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { Router,ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {PharmacyService} from '../../../services/pharmacy.service'


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [MessageService]

})
export class EmployeeComponent implements OnInit {

  employees:Employee[]
  displayModal: boolean;
  displayBaic:boolean
  employee:Employee
  pharmacyObj:Pharmacy
  empIdRow:number
  pharmacy:Pharmacy[]
  msgs: Message[] = [];

  constructor(
  private drugService:DrugService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private routee:Router,private ActivatedRoute:ActivatedRoute,
  private EmployeesService:EmployeesService ,
  private pharmacyService:PharmacyService

    ) { }

  ngOnInit(): void {
   
    this.employee =
    {
      id:0,name:'',address:'',email:'',pharmacyLoggedInID:0,telephone:'',pharmacyName:''
    }
    
    this.EmployeesService.GetAllEmployees()
    .subscribe(emps=>{
    this.employees=emps
    console.log(this.employees)
    })
    this.pharmacyService.GetAllPharmacies()
    .subscribe(pharmacy=>{
    this.employee.pharmacyLoggedInID=Number(this.employee.pharmacyLoggedInID)
      this.pharmacy=pharmacy
    })
    
  }
  
  showModalDialog()
  {
    this.employee =
    {
      id:0,name:'',address:'',email:'',pharmacyLoggedInID:0,telephone:'',pharmacyName:''
    }
    this.pharmacy=[]
    this.pharmacyService.GetAllPharmacies()
    .subscribe(pharmacy=>{
    this.employee.pharmacyLoggedInID=Number(this.employee.pharmacyLoggedInID)
      this.pharmacy=pharmacy
    })
    
    this.displayModal = true;
  }

  showBasicDialog()
  {
    this.displayBaic = true;
  }

  addNewEmployee()
  {
    // this.ngOnInit()
    this.EmployeesService.insertEmployee(this.employee)
    .subscribe(e=>{
      this.ngOnInit()
    })
    this.displayModal = false;
  }
showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'Drug Deleted Successfully'});
}

showWarn() {
  this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Drug Deleted Successfully'});
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'Drug Deleted Successfully'});
}

showTopLeft() {
  this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
}
deleteOneEmp(id:number)
{
  this.EmployeesService.deleteEmp(id).subscribe(
   emps=>{
     console.log(emps)
     this.EmployeesService.GetAllEmployees().subscribe(e=>
      this.employees=e
      )
   }
  )
  console.log(id)
}

editEmp()
{
console.log(this.empIdRow)
this.employee.pharmacyLoggedInID=Number(this.employee.pharmacyLoggedInID)
// this.EmployeesService.updateEmp(this.employee,this.empIdRow).subscribe(e=>{
//   console.log("Mabrook Y bb"),
//   this.routee.navigate(['home/employee'])
//   this.displayBaic =false
//   this.EmployeesService.GetAllEmployees().subscribe(emps=>{
//     this.employees=emps
//   })

// })
}
  editBasicDialog(id){
    this.empIdRow = id
   this.displayBaic=true
    this.EmployeesService.getEmpByID(id).subscribe(emp=>{
      console.log(emp)
    this.employee=emp;
  })
  }


  // confirmmmmmmm(id:number) {
  //   this.confirmationService.confirm({
  //       message: 'Do you want to delete this record?',
  //       header: 'Delete Confirmation',
  //       icon: 'pi pi-info-circle',
  //       accept: () => {
  //       console.log(id)
  //         this.deleteOneEmp(id)
  //           this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
  //       },
  //       reject: () => {
  //           this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //       }
  //   });
  // }

  
  








  
}
