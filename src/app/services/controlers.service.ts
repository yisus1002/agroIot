import { CultivoService } from './cultivo.service';
import { Injectable, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FormArray, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
  public cultivo:any;
  public formu!:    FormGroup;
  public gasto:any[]=[];
  

  // @ViewChild('appDialog') appDialog: DialogComponent;
  
  constructor(private toastr: ToastrService,
              public _sCul: CultivoService,
              private form: FormBuilder,
              ) {
    this.ordenarGasto();
    setTimeout(() => {
      this.leerToken()
    }, 800);
  };
// ---------------------------------------------------------------------

get gastos(){   return this.formu.get('gastos') as FormArray};
get gastosV(){   return this.formu.get('gastos')?.invalid && this.formu.get('gastos')?.touched};
get hectareas(){ return this.formu.get('hectareas')?.invalid && this.formu.get('hectareas')?.touched};
get descripcion(){ return this.formu.get('descripcion')?.invalid && this.formu.get('descripcion')?.touched};
get fecha_siembre(){ return this.formu.get('fecha_siembre')?.invalid && this.formu.get('fecha_siembre')?.touched};
get departamento(){ return this.formu.get('departamento')?.invalid && this.formu.get('departamento')?.touched};
get municipio(){ return this.formu.get('municipio')?.invalid && this.formu.get('municipio')?.touched};
get vereda(){ return this.formu.get('vereda')?.invalid && this.formu.get('vereda')?.touched};
// ---------------------------------------------------------------------

public loadFormEdit(cultivo:any, gasto:any){
  this.cultivo=cultivo;
  this.formu.reset({
    hectareas :cultivo?.hectareas,
    descripcion :cultivo?.descripcion,
    fecha_siembre :cultivo?.fecha_siembre.slice(0,9),
    departamento :cultivo?.vereda?.municipio?.departamento?.idDepartamento,
    municipio :cultivo?.vereda?.municipio?.idMunicipio,
    vereda :cultivo?.vereda?.idVereda,
    // gastos:
  });
this.gasto= gasto;
this.gastos.clear()
if(this.gasto.length>0){
  this.gasto.forEach?.((gast:any)=> this.gastos.push(this.form.group({
    costo      : new FormControl(gast?.costo, [Validators.required]),
    cantidad   : new FormControl(gast?.cantidad, [Validators.required]) ,
    descripcion: new FormControl(gast?.descripcion, [Validators.required]),
    tipo       : new FormControl(gast?.tipo, [Validators.required]),
})))
}


}

// ---------------------------------------------------------------------
openModal(){

}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
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
