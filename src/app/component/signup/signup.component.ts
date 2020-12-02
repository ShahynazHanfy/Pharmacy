import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: any
  password: any
  role: string
  constructor(private loginSer: LoginService, private routee: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  ngOnInit() {
  }
  getData() {
    this.loginSer.login(this.username, this.password)
      .subscribe(
        res => {
          // console.log(res+"res")
          console.log(res)
          localStorage.setItem("token", res["token"])
          localStorage.setItem("roles", res["roles"])
          localStorage.setItem("pharmacyLoggedInID", res["pharmacyLoggedInID"])
          this.role = localStorage.getItem("roles")
          console.log(localStorage.getItem("token"))
          if (this.role == 'SuperAdmin') {
            this.routee.navigate(['/home/dashboard'])
            console.log(this.role)
          }
          else {
            this.routee.navigate(['/home/showdrug'])
            console.log(this.role)
          }
        }
      )
    console.log(localStorage.getItem("roles"))
    console.log(localStorage.getItem("pharmacyLoggedInID"))
    console.log(localStorage)
    // localStorage.clear();
  }
}
