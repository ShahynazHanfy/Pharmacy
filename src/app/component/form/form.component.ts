import { Component, OnInit } from '@angular/core';
import {FormService} from '../../services/form.service'
import {Form} from '../../Models/Form'
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  forms:Form []
  constructor( private formService:FormService ) { }

  ngOnInit(): void {
    this.formService.GetAllForms().subscribe(forms=>{
      this.forms=forms,
      console.log(this.forms)
    }),console.log(error)
  }

}
