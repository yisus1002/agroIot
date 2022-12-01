import { gasto } from './../models/usuario/gasto.model';
import { GastoService } from './gasto.service';
import { UbicacionService } from './ubicacion.service';
import { CultivoService } from './cultivo.service';
import { Injectable, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FormArray, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
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
  public gast:any[]=[];
  public gasTotal:any;

  
  constructor(private toastr: ToastrService,
              public _sCul: CultivoService,
              private form: FormBuilder,
              public _sUbi: UbicacionService,
              public _sGas: GastoService,
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
    fecha_siembre :cultivo?.fecha_siembre.slice(0,10),
    departamento :cultivo?.vereda?.municipio?.departamento?.idDepartamento,
    municipio :cultivo?.vereda?.municipio?.idMunicipio,
    vereda :cultivo?.vereda?.idVereda,
    // gastos:
  });
this.gasto= gasto;
this.gastos.clear()
if(this.gasto.length>0){
  this.gasto.forEach?.((gast:any)=> this.gastos.push(this.form.group({
    idGasto    :new FormControl(gast?.idGasto),
    costo      : new FormControl(gast?.costo, [Validators.required]),
    cantidad   : new FormControl(gast?.cantidad, [Validators.required]) ,
    descripcion: new FormControl(gast?.descripcion, [Validators.required]),
    tipo       : new FormControl(gast?.tipo, [Validators.required]),
})))
}
// console.log(this.formu.value);


}

// ---------------------------------------------------------------------

public getDepartamento(){
  this._sUbi.getDepartamento().
  pipe(finalize(()=>{
    this.opcionesDpto.unshift({
      idDepartamento:'', nombre: 'Seleccione un departamento'
    })
  }))
  .subscribe({
    next: (data:any)=>{ 
      this.opcionesDpto=data.sort((a:any,b:any)=> {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      })
      
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
// ---------------------------------------------------------------------

  getMunicipio(){ 
  let id= this.formu.get('departamento')?.value;
  if(id>0){
    this._sUbi.getDepartamentoId(id)
    .pipe(finalize(()=>{
      this.opcionesMuni.unshift({
        idMunicipio:'', nombre: 'Seleccione un municipio'
      }); 
    this.formu.get('municipio')?.enable()
    }))
    .subscribe({
      next: (data:any)=>{
        this.opcionesMuni=[]
        this.opcionesMuni=data?.municipios.sort((a:any,b:any)=> {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        })
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }else{
    this.opcionesMuni=[]
    this.opcionesVrda=[];
    this.opcionesMuni.unshift({
      idMunicipio:'', nombre: 'Seleccione un municipio'
    });
    this.opcionesVrda.unshift({
      idVereda:'', nombre: 'Seleccione una vereda'
    })
    this.formu.get('municipio')?.disable()
    this.formu.get('vereda')?.disable()
  }
  }
// ---------------------------------------------------------------------
  getVereda(){
  let id =this.formu.get('municipio')?.value;
  if(id>0){
    this._sUbi.getMunicipioId(id)
    .pipe(finalize(()=>{
      this.opcionesVrda.unshift({
        idVereda:'', nombre: 'Seleccione una vereda'
      })
      this.formu.get('vereda')?.enable()
    }))
    .subscribe({
      next: (data:any)=>{
        this.opcionesVrda=[]
        this.opcionesVrda=data?.veredas;
        this.opcionesVrda=this.opcionesVrda?.sort((a:any,b:any)=> {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        })
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this.showToastr_error(error?.message)
        }
      }
    })
  }else{
    this.opcionesVrda=[];
    this.opcionesVrda.unshift({
      idVereda:'', nombre: 'Seleccione una vereda'
    })
    this.formu.get('vereda')?.disable()
  }
  }
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
  getCultivoId(){
    this._sCul.getCultivoId(this.token, this.cultivo?.idCultivo)
    .pipe(finalize(()=>{
      
    }))
    .subscribe({
      next: (data:any)=>{
        this.cultivo=data;
        console.log(this.cultivo);
        
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
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
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
      }})
  }
  // ----------------------------------------------------------------------
  getGastoCultivoId(){
    this._sGas.getGastoCultivoId(this.token, this.cultivo?.idCultivo)
    .pipe(finalize(()=>{
      let gastototal:gasto[]=this.gast;
      // const gas= 
      this.loadFormEdit(this.cultivo,this.gast)
      this.getMunicipio()
      this.getVereda();
    }))
    .subscribe({
      next: (data:any)=>{
        this.gast=data;
        console.log(data);
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
  getGastoCultivoIds(){
    this._sGas.getGastoCultivoId(this.token, this.cultivo?.idCultivo)
    .pipe(finalize(()=>{

    }))
    .subscribe({
      next: (data:any)=>{
        this.gast=data;
        console.log(data);
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
