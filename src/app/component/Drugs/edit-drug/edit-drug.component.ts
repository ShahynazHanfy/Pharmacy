import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../../services/drug.service'
import {Drug} from './../../../Models/Drug'
import {TheraGroup} from './../../../Models/TheraGroup'
import {TheraSubGroup} from './../../../Models/TheraSubGroup'
import {Unit} from './../../../Models/Unit'
import {Country} from './../../../Models/Country'
import {ROAD} from './../../../Models/ROAD'
import {Form} from './../../../Models/Form'
import {Firm} from './../../../Models/Firm'
import { from } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-edit-drug',
  templateUrl: './edit-drug.component.html',
  styleUrls: ['./edit-drug.component.css']
})
export class EditDrugComponent implements OnInit {

  Drug:any
  Form:Form[]
  Unit:Unit[]
  firm:Firm[]
  Country:Country[]
  ROAD:ROAD[]
  Thera:TheraGroup[]
  TheraSub:TheraSubGroup[]
  TheraGroupID = 0
  fileToUpload: File;
  selected: string
  constructor(private drugservice:DrugService,private routee:Router,private ActivatedRoute:ActivatedRoute) 
  {
    this.Drug =
   { 
    barCode:'',genericName:'',license:'',strength:'',code:'',img:'',pack:'',reOrderLevel:'',tradeName:'',
    TheraSubGroupID:0,FormID:0,FirmID:0,UnitID:0,ROADID:0,CountryID:0
   }
  }
  empId= this.ActivatedRoute.snapshot.params['empID']


  ngOnInit() {

    // console.log(this.empId)
    this.drugservice.getDrugByID(this.empId).subscribe(
      data=>{
       this.Drug= data
      //  console.log(data+"ddd")
      },error=>{console.log(error)}
    )

    this.drugservice.GetAllThera()
    .subscribe(Thera => {
      this.Thera= Thera
      // console.log(Thera)
  }  
    ,error=>{console.log(error);
    }) ;

    this.drugservice.GetAllForms()
    .subscribe(Form => {
      this.Form= Form
      // console.log(Form)
  }
    ,error=>{console.log(error);
    }) 

    this.drugservice.GetAllFirms()
    .subscribe(Firm => {
      this.firm= Firm
      // console.log('firm'+Firm)
  }
    ,error=>{console.log(error);
    }) 

    this.drugservice.GetAllActiveUnits()
    .subscribe(units => {
      this.Unit= units,
      console.log('unit'+units)
  }
    ,error=>{console.log(error);
    }) 

    this.drugservice.GetAllActiveCountry()
    .subscribe(Country => {
      this.Country= Country,
      console.log('country'+Country)
  }
    ,error=>{console.log(error);
    }) 
    

    this.drugservice.GetAllActiveROAD()
    .subscribe(ROAD => {
      this.ROAD= ROAD,
      console.log('road'+ROAD)
  }
    ,error=>{console.log(error);
    }) 
}


  SubmitDrug(){
    console.log("gg")
    // console.log(this.Drug); 
    this.Drug.theraSubGroupID=Number(this.Drug.theraSubGroupID);
   console.log(typeof(this.Drug.theraSubGroupID)) 
   console.log(this.Drug.theraSubGroupID)
    this.Drug.formID=Number(this.Drug.formID);
    this.Drug.firmID=Number(this.Drug.firmID);
    this.Drug.strength=String(this.Drug.strength)
    this.Drug.pack=String(this.Drug.pack)
    // console.log(typeof(this.Drug.FirmID))
    // console.log(this.Drug.FirmID)
    // console.log("submitDrug")
    this.Drug.countryID=Number(this.Drug.countryID);
    this.Drug.rOADID=Number(this.Drug.rOADID);
    this.Drug.unitID=Number(this.Drug.unitID);
    // console.log(typeof(this.Drug.TheraSubGroupID));
    console.log(this.Drug)
    this.drugservice.updateDrug(this.Drug,this.empId)
    .subscribe(Drug => {
      console.log("Mabork y wa74")
      this.routee.navigate(['home/showdrug'])
  }
    ,error=>{console.log(error);
    }) ;
  }


  OnChangeGroupID( i: any){
    this.selected=i.target.value
    console.log(this.selected)
    console.log(i.targ)
     this.drugservice.getSubByGrpID(this.TheraGroupID).subscribe(TheraSub => {
      this.TheraSub= TheraSub,
      console.log(TheraSub)
  }
    ,error=>{console.log(error);
    }) ;
  }

  
onFileSelected(files: FileList) {

  this.fileToUpload = files.item(0);
  const oldName = this.fileToUpload.name;
  const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const lengthOfCode = 40;
  const newName=this.makeRandom(lengthOfCode, possible);
  
  console.log(this.fileToUpload.name);
  Object.defineProperty(this.fileToUpload,'name',{
    writable:true,
    value:newName+fileExtension
  });
  console.log(this.fileToUpload.name);

  this.Drug.img=this.fileToUpload.name;
  //alert(this.prd.Img);

  this.uploadFileToActivity();
}
uploadFileToActivity() {
this.drugservice.postFile(this.fileToUpload).subscribe(data => {
  // do something, if upload success
  //c(data);
  }, error => {
    console.log(error);
  });
}
makeRandom(lengthOfCode,possible)
{
let text="";
for(let i=0;i<lengthOfCode;i++)
{
  text+=possible.charAt(Math.floor(Math.random()*possible.length))
}
return text;
}
}
