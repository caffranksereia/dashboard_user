import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { IUser, Iinfo } from 'src/app/_interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://localhost:3000/api/v1'

  getUser(id:string):Observable<IUser>{
    return this.http.get<IUser>(`${this.URL}/users/${id}`);
  }

  getAll():Observable<[IUser]>{
    return this.http.get<[IUser]>(`${this.URL}/users`)
    .pipe(
      retry(2),
      catchError(this.handleError)

    );
     

  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
