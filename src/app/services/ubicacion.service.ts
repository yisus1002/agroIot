import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlersService } from './controlers.service';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  // public id_municipio:number=0;
  constructor(
              private http: HttpClient,
              private __Parent: ParentService,
              ) {
   }

  getDepartamento():Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}departamento/`);
   }
  getDepartamentoId(id:any):Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}departamento/${id}`);
   }

  getMunicipio():Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}municipio/`);
  }
  getMunicipioId(id:any):Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}municipio/${id}`);
  }

  getVereda():Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}vereda/`);
  }
  getVeredaId(id:any):Observable<any>{
    return this.http.get<any>(`${this.__Parent.API_URL}vereda/${id}`);
  }

}