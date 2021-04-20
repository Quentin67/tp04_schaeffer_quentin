import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'
import { Reference } from 'src/shared/models/reference';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirstService {

  
  constructor(private httpClient : HttpClient) { 
  }

  public getCatalogue () : Observable<any> {
    return this.httpClient.get<any> (environment.getCatalogue);
  }
  public getDetails(id: string): Observable<Reference>{
    return this.httpClient.get<Reference>(environment.getDetails.replace('{id}',id)).pipe(map((response: any) => response.json()));
    
  }
}
