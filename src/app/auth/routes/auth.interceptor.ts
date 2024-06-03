import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
export const accessToken = 'access_token'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router:Router, private authService:AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(localStorage.getItem(accessToken)){
      let access_token = localStorage.getItem(accessToken);
      const authReq = req.clone({
        setHeaders: {
          Authorizarion: accessToken
        }
      });
      return next.handle(authReq).pipe(catchError((error) =>{
        console.log(error);
        if(error instanceof HttpErrorResponse){
          if(error.status === 401) {
            this.authService.logOut();
            this.router.navigateByUrl('/auth/login');
          }
        }
        return throwError(error)
      }))
    }
    console.log(req)
    return next.handle(req)
  }
}