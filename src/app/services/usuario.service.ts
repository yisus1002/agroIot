import { ParentService } from './parent/parent.service';
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
  constructor(private __Parent: ParentService,
    private http:HttpClient) {
   }
   postUser(usuario:Usuario):Observable<Usuario>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true', 
    })  
    return (this.http.post<any>(`${this.__Parent.API_URL}pequenos-productores/`,JSON.stringify(usuario),
    {headers: headers}));
   }
   getUserId(id:any, token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    })
    return (this.http.get<any>(`${this.__Parent.API_URL}pequenos-productores/${id}`,{headers: headers}))
   }
   putUser(id:any,token:any,user:Usuario):Observable<any>{
    const usuario={
      nombre1    : user.nombre1,
      nombre2    : user.nombre2,
      apellido1  :user.apellido1,
      apellido2  :user.apellido2,
      correo     : user.correo,
      contraseña : user.contraseña,
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    })
    return this.http.put<any>(`${this.__Parent.API_URL}pequenos-productores/${id}`,usuario,{headers: headers})
   }
}
