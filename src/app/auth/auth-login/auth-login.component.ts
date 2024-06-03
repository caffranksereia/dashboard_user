import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { IAuth, IUser } from 'src/app/_interface/user';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  formGroup!: FormGroup;
  error:boolean = false;
  greate:boolean = false;
  msg:string = ''
  constructor(private router: Router, private http: AuthServiceService){}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl("", [Validators.email]),
      password: new FormControl("", [Validators.minLength(6), Validators.required])
    })
  }

  get Username() {
    return this.formGroup.get('username')
  }

  get Password() {
    return this.formGroup.get('password')
  }

  onSubmit(){

      const data:IAuth = {
        email:this.formGroup.controls['username'].value.trim(),
        password: this.formGroup.controls['password'].value.trim()
       
      }
      this.http.auth(data).subscribe(
        res => {
          console.log(res.user.name, res.accessToken);
          this.greate = true;
          this.msg = `login sucess ${res.user.name}`
          this.router.navigateByUrl(`${res.user.id}/dashboard`);
          
          
        },err =>{
          this.error = true;
          this.msg = 'email/usernamne or passwor incorrect'
          console.log(err)
        }
      )
  }
}
