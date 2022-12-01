import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  constructor(
    private http: HttpClient,
    private __Parent: ParentService
  ) { }

  getCultivo(token:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.get<any>(`${this.__Parent.API_URL}cultivo/`, {headers: headers})
  }
  getCultivoId(token:any, id_cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.get<any>(`${this.__Parent.API_URL}cultivo/${id_cultivo}`, {headers: headers})
  }

  postCultivo(token:any, id_vereda:any,cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.post<any>(`${this.__Parent.API_URL}cultivo/${id_vereda}/vereda`, cultivo,{headers:headers});
  }

  putCultivo(token:any, id_cultivo:any,cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.put<any>(`${this.__Parent.API_URL}cultivo/${id_cultivo}`, cultivo, {headers:headers});
  }


  deletCultivo(token:any, id_cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.delete<any>(`${this.__Parent.API_URL}cultivo/${id_cultivo}`, {headers:headers});
  }

}
