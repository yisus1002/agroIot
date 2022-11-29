import { CultivoService } from './cultivo.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlersService {
  public token:any;

  public opcionesDpto: any = [];
  public opcionesMuni: any = [];
  public opcionesVrda: any = [];
  public opcionesGasto: any = [
    { cod: 'Siembra', nombre: 'siembra' },
    { cod: 'Pesticida', nombre: 'Pesticidas' },
    { cod: 'Plaguicidas', nombre: 'Plaguicidas' },
    { cod: 'Abonos', nombre: 'Abonos' },
    { cod: 'Compra de semilla', nombre: 'Compra de semilla' },
    { cod: 'Recolección', nombre: 'Recolección' },
  ];

  public cultivos:any[]=[];
  
  constructor(private toastr: ToastrService,
              public _sCul: CultivoService) {
    this.ordenarGasto();
    setTimeout(() => {
      this.leerToken()
    }, 800);
  };

  leerToken(){
    if(localStorage.getItem('token')){
      this.token= localStorage.getItem('token');
    }else{
      this.token='';
    }
    return this.token;
  }
  ordenarGasto(){
    this.opcionesGasto=this.opcionesGasto.sort((a:any,b:any)=> {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
    this.opcionesGasto.unshift({
      cod:'', nombre: 'Seleccione un tipo'
    })
  }
  // ----------------------------------------------------------------------
  getCultivo(){
    this._sCul.getCultivo(this.token)
    .pipe(finalize(()=>{
      
    }))
    .subscribe({
      next: (data:any)=>{
        this.cultivos=data;
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }
  // ----------------------------------------------------------------------
  deletCUltivo(id:any){
    this._sCul.deletCultivo(this.token, id)
    .pipe(finalize(()=>{
      this.getCultivo();
    }))
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        this.showToastr_success('Cultivo eliminado')
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }
  // ----------------------------------------------------------------------
  // toast ---------------------------
  showToastr_success(title: string) {
    this.toastr.success(`${title}`);
  }
  showToastr_error(title: string) {
    this.toastr.error(`${title}`);
  }
}
