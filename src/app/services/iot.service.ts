import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class IotService {

  constructor(private __Parent: ParentService,
    private http:HttpClient) { }

    getIotCultivoId(id:any, token:any):Observable<any>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      })
      return (this.http.get<any>(`${this.__Parent.API_URL}iot/${id}/cultivo`,{headers: headers}))
     }
}
