import { ControlersService } from './controlers.service';
import { Usuario } from './../models/usuario/usuario.model';
import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // public url_user:string= `${environment.API_URL}pequenos-productores/`
  constructor(private _sCtrl: ControlersService,
    private http:HttpClient) {
   }
   postUser(usuario:Usuario):Observable<Usuario>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true', 
    })  
    return (this.http.post<any>(`${this._sCtrl.API_URL}pequenos-productores/`,JSON.stringify(usuario),
    {headers: headers}));
   }
}
