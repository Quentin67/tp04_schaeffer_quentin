import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'
import { Reference } from 'src/shared/models/reference';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private httpClient : HttpClient) { 
  }

  public login(login: string, password: string): Observable<any>{
      return this.httpClient.post<any>(environment.login,{
          login: login,
          password: password
      },{
          observe: 'response',
          responseType: 'blob' as 'json'
        });
  }
  public register(login: string, password: string): Observable<any>{
    return this.httpClient.post<any>(environment.register,{
      login: login,
      password: password
  },{
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
