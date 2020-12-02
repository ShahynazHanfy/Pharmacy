import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DrugService } from '../../../services/drug.service'
import { Drug } from './../../../Models/Drug'
import { TheraGroup } from './../../../Models/TheraGroup'
import { TheraSubGroup } from './../../../Models/TheraSubGroup'
import { Unit } from './../../../Models/Unit'
import { Country } from './../../../Models/Country'
import { ROAD } from './../../../Models/ROAD'
import { Form } from './../../../Models/Form'
import { Firm } from './../../../Models/Firm'
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FirmService } from '../../../services/firm.service'
import { FormService } from '../../../services/form.service'
import { HttpEventType, HttpClient } from '@angular/common/http';
import { DrugDetails } from '../../../Models/DrugDetails'

// import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.css']
})
export class AddDrugComponent implements OnInit {

  Drug: Drug
  Form: Form[]
  Unit: Unit[]
  firm: Firm[]
  Country: Country[]
  ROAD: ROAD[]
  Thera: TheraGroup[]
  TheraSub: TheraSubGroup[]
  TheraGroupID = 0
  fileToUpload: File;
  imgName: string
  DrugDetailsobj: DrugDetails
  DrugDetails: DrugDetails[]
  drugs: Drug[]
  public progress: number;
  public message: string;
  displayModal: boolean;

  @Output() public onUploadFinished = new EventEmitter();

  uploadedFiles: any[] = [];
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.uploadFileToActivity()

  }
  constructor(private drugservice: DrugService,
    private routee: Router,
    private ActivatedRoute: ActivatedRoute,
    private firmSer: FirmService,
    private formSrv: FormService,
    private http: HttpClient
  ) {
    this.Drug = {
      CountryID: 0, img: '', id: 0, drugDetails: this.DrugDetailsobj
      , FirmID: 0, FormID: 0, ROADID: 0, TheraSubGroupID: 0, UnitID: 0, genericName: '', tradeName: ''
    }
    this.DrugDetails = []

    this.DrugDetailsobj = {
      IsActive: true, IsChecked: true, barCode: '', code: '', exp_Date: new Date(), id: 0, license: '', pack: '', price: 2,
      prod_Date: new Date(), quentity: 20, reOrderLevel: '',size:0, strength: '', drugID: 0, pharmacyLoggedInID: 0
    }
  }
  ngOnInit() 
  {

    this.drugservice.GetAllActiveThera()
      .subscribe(Thera => {
        this.Thera = Thera,
          console.log(Thera)
      }
        , error => {
          console.log(error);
        });
        
    this.drugservice.GetAll().subscribe(d => {
      this.drugs = d
      console.log(this.drugs)
    })

    this.formSrv.GetAllActiveForms()
      .subscribe(Form => {
        this.Form = Form,
          console.log(Form)
      }
        , error => {
          console.log(error);
        })

    this.firmSer.GetActiveFirms()
      .subscribe(Firm => {
        this.firm = Firm,
          console.log('firm' + Firm)
      }
        , error => {
          console.log(error);
        })

    this.drugservice.GetAllActiveUnits()
      .subscribe(units => {
        this.Unit = units,
          console.log('unit' + units)
      }
        , error => {
          console.log(error);
        })

    this.drugservice.GetAllActiveCountry()
      .subscribe(Country => {
        this.Country = Country,
          console.log('country' + Country)
      }
        , error => {
          console.log(error);
        })

    this.drugservice.GetAllActiveROAD()
      .subscribe(ROAD => {
        this.ROAD = ROAD,
          console.log('road' + ROAD)
      }
        , error => {
          console.log(error);
        })
  
  
  }

  showModalDialog() 
    {
      this.displayModal = true;
      this.ngOnInit();
    }




  SubmitDrug() {
    this.Drug.TheraSubGroupID = Number(this.Drug.TheraSubGroupID);
    this.Drug.FormID = Number(this.Drug.FormID);
    this.Drug.FirmID = Number(this.Drug.FirmID);
    console.log(typeof (this.Drug.FirmID))
    console.log(this.Drug.FirmID)
    this.Drug.CountryID = Number(this.Drug.CountryID);
    this.Drug.ROADID = Number(this.Drug.ROADID);
    this.Drug.UnitID = Number(this.Drug.UnitID);
    console.log(typeof (this.Drug.TheraSubGroupID));
    this.DrugDetailsobj.price = Number(this.DrugDetailsobj.price)
    this.DrugDetailsobj.pharmacyLoggedInID = Number(localStorage.getItem("pharmacyLoggedInID"))

    console.log("detail" + this.DrugDetailsobj);
    this.DrugDetails.push(this.DrugDetailsobj)
    this.Drug.drugDetails = this.DrugDetailsobj
    // console.log(this.DrugDetails)
    // console.log("drug "+this.Drug.drugDetails)
    this.drugservice.insertDrug(this.Drug)
      .subscribe(Drug => {
        console.log("Mabork y wa74")
        this.routee.navigate(['home/showdrug'])
      }
        , error => {
          console.log(error);
        });
  }
  OnChangeGroupID(i: any) {
    // console.log(i.targ)
    this.drugservice.getSubByGrpID(this.TheraGroupID).subscribe(TheraSub => {
      this.TheraSub = TheraSub,
        console.log(TheraSub)
    }
      , error => {
        console.log(error);
      });
  }

  onFileSelected(files: FileList) {
    console.log(files)
    this.fileToUpload = files.item(0);
    const oldName = this.fileToUpload.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    const newName = this.makeRandom(lengthOfCode, possible);
    this.imgName = this.fileToUpload.name;
    console.log(this.imgName)
    console.log(this.fileToUpload.name);
    Object.defineProperty(this.fileToUpload, 'name', {
      writable: true,
      value: newName + fileExtension
    });
    console.log(this.fileToUpload.name);

    this.Drug.img = this.fileToUpload.name;
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
  makeRandom(lengthOfCode, possible) {

    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:51563/api/drugs/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
