import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InformeActualResponse } from '../models/cultivo-response';
import { Iot, IotResponse, RegistroResponse } from '../models/iot-response';
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class IotService {

  constructor(private __Parent: ParentService,
    private http:HttpClient) { }

    getIotCultivoId(id:any, token:any):Observable<Iot[]>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return (this.http.get<IotResponse>(`${this.__Parent.API_URL}iot/${id}/cultivo`,{headers: headers}))
      .pipe(
        map((resp)=> resp.iots)
      )
     }


     public getRegistro(id:any, token:any):Observable<RegistroResponse[]>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<RegistroResponse[]>(`${this.__Parent.API_URL}informe/${id}/cultivo`,{headers: headers});
     }

     public postRegistro(id:any, token:any):Observable<InformeActualResponse>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
       return this.http.post<InformeActualResponse>(`${this.__Parent.API_URL}informe/${id}/cultivo`,{}, {headers: headers});

     }
}
