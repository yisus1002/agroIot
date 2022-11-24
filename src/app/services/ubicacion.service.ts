import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlersService } from './controlers.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  // public id_municipio:number=0;
  constructor(
              private http: HttpClient,
              private _sCtrl: ControlersService
              ) {
   }

  getDepartamento():Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}departamento/`);
   }
  getDepartamentoId(id:any):Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}departamento/${id}`);
   }

  getMunicipio():Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}municipio/`);
  }
  getMunicipioId(id:any):Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}municipio/${id}`);
  }

  getVereda():Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}vereda/`);
  }
  getVeredaId(id:any):Observable<any>{
    return this.http.get<any>(`${this._sCtrl.API_URL}vereda/${id}`);
  }

}