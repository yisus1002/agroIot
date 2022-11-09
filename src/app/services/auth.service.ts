import { ControlersService } from './controlers.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token:any;
  public idUser:any;
  constructor(private http:HttpClient,
              private router: Router,
              private _sCtrl: ControlersService) {
    this.leerToken(); 
   }

  postLogin(correo:any, contraseña:any):Observable<any>{ 
    return (this.http.post<any>(`${this._sCtrl.API_URL}auth/login`,{correo,contraseña}))
  }


  getToken(correo:any, contraseña:any){
    this.postLogin(correo, contraseña)
    .pipe()
    .subscribe({
      next: (data:any)=>{
        this.idUser=data?.idPequeñoProductor;
        this.saveToken(data?.token, this.idUser);
        this.router.navigate(['/home'])
      },
      error:(error:any)=>{ 
        this._sCtrl.showToastr_error((error?.error.message).toString())
      }
    })
  }


  saveToken(token:string, id:number){
    this.token =token;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id.toString());
    let hoy = new Date();
    hoy.setSeconds(86400);
    localStorage.setItem('expira', hoy.getTime().toString())
  }
  leerToken(){
    if(localStorage.getItem('token')){
      this.token= localStorage.getItem('token');
    }else{
      this.token='';
    }
    return this.token;
  }
  isAutentificado():boolean{
    // const token = localStorage.getItem('token');
    if(this.token.length<2){
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
