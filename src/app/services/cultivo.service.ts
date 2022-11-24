import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlersService } from './controlers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  constructor(
    private http: HttpClient,
    private _sCtrl: ControlersService,
    // private _sAuth: AuthService,
  ) { }

  getCultivo(token:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.get<any>(`${this._sCtrl.API_URL}cultivo/`, {headers: headers})
  }
  getCultivoId(token:any, id_cultivo:any):Observable<any>{
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
    })
    return this.http.get<any>(`${this._sCtrl.API_URL}cultivo/${id_cultivo}`, {headers: headers})
  }

}
