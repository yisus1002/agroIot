import { ControlersService } from './controlers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';  
import { ParentService } from './parent/parent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idUser:any;
  public habilitar:boolean=false;
  constructor(private http:HttpClient,
              private router: Router,
              private _sCtrl: ControlersService,
              private __Parent: ParentService,
              ) {
    this._sCtrl.leerToken(); 
   }

  postLogin(correo:any, contraseña:any):Observable<any>{ 
    return (this.http.post<any>(`${this.__Parent.API_URL}auth/login`,{correo,contraseña}))
  }


  getToken(correo:any, contraseña:any){
    
    this.habilitar=true;
    this.postLogin(correo, contraseña)
    .pipe(finalize(()=>{
      this.habilitar=false;
    }))
    .subscribe({
      next: (data:any)=>{
        this.idUser=data?.idPequeñoProductor;
        this.saveToken(data?.token, this.idUser);
        this.router.navigate(['/home'])
      },
      error:(error:any)=>{ 
        if(error?.error?.message){
          this._sCtrl.showToastr_error((error?.error?.message).toString())
        }else{
          this._sCtrl.showToastr_error(error?.message)
        }
      }
    })
  }


  saveToken(token:string, id:number){
    this._sCtrl.token =token;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id.toString());
    let hoy = new Date();
    hoy.setSeconds(86400);
    localStorage.setItem('expira', hoy.getTime().toString())
  }

  isAutentificado():boolean{
    // const token = localStorage.getItem('token');
    if(this._sCtrl.token.length<2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira')); 
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if(expiraDate> new Date()){
      return true;
    }else{
      return false;
    }
    // return this.userToken.length > 2;
       // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }

}
