import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser, Iinfo } from 'src/app/_interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:3000/api/v1'

  auth(data:{email:string, password:string}):Observable<Iinfo>{
    return this.http.post<Iinfo>(`${this.URL}/auth/login`, data)
    .pipe(
      tap((u: Iinfo)=>{
        console.log(u.accessToken);
        console.log(u.user.name);
        console.log(u)
        return localStorage.setItem('acesss_token', u.accessToken);
      })
    )
  }

  isAuthenticated(){
     localStorage.getItem('acesss_token')
  }

  async logOut(){
     await localStorage.removeItem('acesss_token')
  }
}
