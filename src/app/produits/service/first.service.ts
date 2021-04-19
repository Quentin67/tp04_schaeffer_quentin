import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FirstService {

  
  constructor(private httpClient : HttpClient) { 
    this.datas = new Array<string> ();  
  }

  cpt : number = 0;
  datas : string [];
  log (data) {
    this.datas.push (data);
    this.cpt++;
    console.log (this.cpt + "" +this.datas );
  }

  URL : string = "http://heroku...";

  public getCatalogue () : Observable<any> {
    return this.httpClient.get<any> (environment.getCatalogue,{
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxMjM0NSIsImVtYWlsIjoiZW1tYW51ZWwubWF1cmljZUBnbWFpbC5jb20iLCJwc2V1ZG8iOiJlbW1hIiwiaWF0IjoxNjE4ODYwMTA4LCJleHAiOjExNjE4ODYwMTA3fQ.IEDnL4VpWze5yKK8O3gcAxsGl0hOO90IgYfQ-jmCSDI'
      })
    });
  }
}
