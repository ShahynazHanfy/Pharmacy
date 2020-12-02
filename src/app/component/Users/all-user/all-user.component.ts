import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {UsersService} from '../../../services/users.service'
import {User} from '../../../Models/User'
// import { EmployeesService } from 'src/app/Services/employees.service';
import { EmployeesService } from "../../../services/employees.service";
import {TableModule} from 'primeng/table';
import{DrugService} from '../../../services/drug.service'
import {PharmacyService} from '../../../services/pharmacy.service'
import { Pharmacy } from 'src/app/Models/Pharmacy';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  users:User[];
  GetUnregisteredUsers:any;   
  NewUser:User;
  AllEmployees: any;
  NewLeaveDialogbool:boolean;
  pharmacy:Pharmacy
  pharmacyName:string
  constructor( 
    private employeeService:EmployeesService,
    private userService:UsersService,
    private drugService:DrugService,
    private pharmacyService:PharmacyService
    ) 
    { 
    this.NewUser={email:'',role:'',userName:'',password:'M@sTech146',pharmacyName:'',pharmacyLoggedInID:0};
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data=>{
        this.users=data;
        console.log(data)
      },
      error=>console.log(error)
      );
      this.employeeService.GetAllEmployees().subscribe(
        data=>{
          this.AllEmployees=data;
          console.log(data)
        },
        error=>console.log(error)
        );
        this.userService.GetUnregisteredUsers().subscribe(
          data=>this.GetUnregisteredUsers=data,
          error=>console.log(error)
        )
  }

  addNewUser()
  {
    console.log(this.NewUser);
    this.NewUser.pharmacyLoggedInID=Number(this.NewUser.pharmacyLoggedInID)
    this.pharmacyService.getPharmacyById(this.NewUser.pharmacyLoggedInID).subscribe(pharmacy=>{
        this.pharmacy=pharmacy
        console.log(pharmacy)
        this.NewUser.pharmacyName=this.pharmacy.name
        console.log(this.NewUser.pharmacyName)   
    })
    this.userService.addUser(this.NewUser).subscribe(
      data=>
      this.ngOnInit()
    )
    this.NewLeaveDialogbool=false
  }
  NewUserDialog()
  {
    this.NewLeaveDialogbool=true;
  }
  onChange(event){
    this.AllEmployees.forEach(element => {
      if(element.id==event)
      {
        console.log(event)
        console.log(element)
        this.NewUser.pharmacyLoggedInID=element.pharmacyLoggedInID
        this.NewUser.email=element.email;
        this.NewUser.userName=element.name;
      }
    });
    
  }
}
