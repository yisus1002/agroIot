import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlersService } from './controlers.service';
import { ParentService } from './parent/parent.service';
import { gasto } from '../models/usuario/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    private _sCtrl  : ControlersService,
    private http    : HttpClient,
    private __Parent: ParentService,


  ) { }

  postGasto(token:any,gasto:gasto[], id_cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.post<any>(`${this.__Parent.API_URL}gasto/${id_cultivo}/cultivo`, gasto, {headers: headers});
  }
  puttGasto(token:any,gasto:any, id_gasto:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.put<any>(`${this.__Parent.API_URL}gasto/${id_gasto}`, gasto, {headers: headers});
  }

  getGastoCultivoId(token:any,id_cultivo:any,):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    });
    return this.http.get<any>(`${this.__Parent.API_URL}gasto/${id_cultivo}/cultivo`, {headers: headers});
  }
  getGastoId(token:any,id_gasto:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })

    return this.http.get<any>(`${this.__Parent.API_URL}gasto/${id_gasto}`, {headers:headers});
  }
  deletGasto(token:any,id_gasto:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })

    return this.http.delete<any>(`${this.__Parent.API_URL}gasto/${id_gasto}`, {headers:headers});
  }

}
