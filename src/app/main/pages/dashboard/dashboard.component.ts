import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "src/app/_interface/user";
import { AuthServiceService } from "src/app/auth/services/auth-service.service";
import { UserService } from "../../service/service";

@Component({
  selector: 'dashboard-main',
  templateUrl:'dashboard.component.html',
  styleUrls:['dashboard.component.css']
})

export class DashboardComponent  implements OnInit{
  id_user: string;
  user_name:string;
  last_login:string;
  user:string;
  users= {} as IUser
  constructor(
    private http:UserService,
     private route:ActivatedRoute){}

  ngOnInit(): void {
  this.id_user= this.route.snapshot.paramMap.get('id') || '';
  console.log(this.id_user)
  this.getUserInfo()
  this.getAllPacients()
  }



  getUserInfo(){
    return this.http.getUser(this.id_user).subscribe(
      user =>{ 
        this.user_name = user.name;
        this.last_login = user.updateAt
      }
    )
  }

  getAllPacients(){

    try {
      this.http.getAll().subscribe({
        next: (data) => {
        
          console.log(data)
        },
      })
    } catch (error:any) {
      console.log(error)
    }
  }


  getOut(){
    console.log('saiu')
  }
}