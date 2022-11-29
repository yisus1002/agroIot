import { GastoService } from './../../services/gasto.service';
import { ControlersService } from './../../services/controlers.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterContentInit, Component, OnInit, Input, DoCheck  } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { finalize } from 'rxjs';
import { CultivoService } from 'src/app/services/cultivo.service';
// import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-formulariocultivo',
  templateUrl: './formulariocultivo.component.html',
  styleUrls: ['./formulariocultivo.component.scss']
})
export class FormulariocultivoComponent implements OnInit, AfterContentInit, DoCheck {
  
  @Input() namefor!:string;
  public formu!:    FormGroup;
  public gasto :any[]=[];
  // public
  // public id_depto:any;


  constructor(
    
    // private validate : ValidatorService,
    private form     : FormBuilder,
    public _crtSer   : ControlersService,
    public _sUbi     : UbicacionService,
    private _sCul    : CultivoService,
    private _sGas    : GastoService, 

  ) { 
    this.createForm(); 
    setTimeout(()=>{
      // Pruebas
      this.loadForm();
      this._crtSer.opcionesMuni.unshift({
        idMunicipio:'', nombre: 'Seleccione un municipio'
      })
      this._crtSer.opcionesVrda.unshift({
        idVereda:'', nombre: 'Seleccione una vereda'
      })
      this.formu.get('municipio')?.disable()
      this.formu.get('vereda')?.disable()
    },1000);
    this._crtSer.leerToken();
  }
  ngDoCheck(): void {
    
  }

  get gastos(){   return this.formu.get('gastos') as FormArray};
  get gastosV(){   return this.formu.get('gastos')?.invalid && this.formu.get('gastos')?.touched};
  get hectareas(){ return this.formu.get('hectareas')?.invalid && this.formu.get('hectareas')?.touched};
  get descripcion(){ return this.formu.get('descripcion')?.invalid && this.formu.get('descripcion')?.touched};
  get fecha_siembre(){ return this.formu.get('fecha_siembre')?.invalid && this.formu.get('fecha_siembre')?.touched};
  get departamento(){ return this.formu.get('departamento')?.invalid && this.formu.get('departamento')?.touched};
  get municipio(){ return this.formu.get('municipio')?.invalid && this.formu.get('municipio')?.touched};
  get vereda(){ return this.formu.get('vereda')?.invalid && this.formu.get('vereda')?.touched};


  ngAfterContentInit(): void { 
    // console.log('hola');
    
  }

  ngOnInit(): void {
    this.getDepartamento()
  }

  public getDepartamento(){
    this._sUbi.getDepartamento().
    pipe(finalize(()=>{
      this._crtSer.opcionesDpto.unshift({
        idDepartamento:'', nombre: 'Seleccione un departamento'
      })
    }))
    .subscribe({
      next: (data:any)=>{ 
        this._crtSer.opcionesDpto=data.sort((a:any,b:any)=> {
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
          this._crtSer.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this._crtSer.showToastr_error(error?.message)
        }
      }
    })
  }

  getMunicipio(){ 
    let id= this.formu.get('departamento')?.value;
    if(id>0){
      this._sUbi.getDepartamentoId(id)
      .pipe(finalize(()=>{
        this._crtSer.opcionesMuni.unshift({
          idMunicipio:'', nombre: 'Seleccione un municipio'
        }); 
      this.formu.get('municipio')?.enable()
      }))
      .subscribe({
        next: (data:any)=>{
          this._crtSer.opcionesMuni=[]
          this._crtSer.opcionesMuni=data?.municipios.sort((a:any,b:any)=> {
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
            this._crtSer.showToastr_error((error?.error.message).toString().toUpperCase())
          }else{
            this._crtSer.showToastr_error(error?.message)
          }
        }
      })
    }else{
      this._crtSer.opcionesMuni=[]
      this._crtSer.opcionesVrda=[];
      this._crtSer.opcionesMuni.unshift({
        idMunicipio:'', nombre: 'Seleccione un municipio'
      });
      this._crtSer.opcionesVrda.unshift({
        idVereda:'', nombre: 'Seleccione una vereda'
      })
      this.formu.get('municipio')?.disable()
      this.formu.get('vereda')?.disable()
    }
  }

  getVereda(){
      let id =this.formu.get('municipio')?.value;
      if(id>0){
        this._sUbi.getMunicipioId(id)
        .pipe(finalize(()=>{
          this._crtSer.opcionesVrda.unshift({
            idVereda:'', nombre: 'Seleccione una vereda'
          })
          this.formu.get('vereda')?.enable()
        }))
        .subscribe({
          next: (data:any)=>{
            this._crtSer.opcionesVrda=[]
            this._crtSer.opcionesVrda=data?.veredas;
            this._crtSer.opcionesVrda=this._crtSer.opcionesVrda?.sort((a:any,b:any)=> {
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
              this._crtSer.showToastr_error((error?.error.message).toString().toUpperCase())
            }else{
              this._crtSer.showToastr_error(error?.message)
            }
          }
        })
      }else{
        this._crtSer.opcionesVrda=[];
        this._crtSer.opcionesVrda.unshift({
          idVereda:'', nombre: 'Seleccione una vereda'
        })
        this.formu.get('vereda')?.disable()
      }
  }

  


  public createForm(){
    this.formu=this.form.group({ 
      hectareas    :["", [Validators.required],[]],
      descripcion  :["", [Validators.required],[]],
      fecha_siembre:["", [Validators.required],[]],
      departamento :["", [Validators.required],[]],
      municipio    :["", [Validators.required],[]],
      vereda       :["", [Validators.required],[]],
      gastos       :this.form.array([],[Validators.required])
    })
  }

  public addGastos(){
    this.gastos.push(
      this.form.group({
        costo       :["", [Validators.required],[]],
        cantidad    :["", [Validators.required],[]],
        tipo        :["", [Validators.required],[]],
        descripcion :["", [Validators.required],[]],
      })
    )
  }

  public getCtrl(key: string, form: FormGroup) { 
    return  (<FormArray>form.get(key)); 
  }
  public deletGasto(id:any){
    this.gastos.removeAt(id);
    console.log(id);
    
  }
 


  public enviar(){
// this.postCultivo()
    console.log(this.formu.value);
    console.log(this.formu.valid);
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        if(controls instanceof FormGroup){
          Object.values(controls.controls).forEach(controls=>controls.markAllAsTouched())
        }else{
          controls.markAllAsTouched();
        }
      });
    }
    console.log(this.formu.value)
    this.postCultivo()

  }
  public loadForm(){
    this.formu.reset({
      hectareas :"",
      descripcion :"",
      fecha_siembre :"",
      departamento :"",
      municipio :"",
      vereda :"",
      // gastos:
    });
this.gasto=    [
  { costo: "", cantidad: "",  descripcion: "", tipo:""}, 
]
// if(this.gasto){
//   for (let gast of this.gasto){
//     (<FormArray>this.formu.get('gastos')).push(
//       new FormGroup({
//         costo: new FormControl(gast.costo),
//         cantidad: new FormControl(gast.cantidad) ,
//         descripcion: new FormControl(gast.descripcion),
//       })
//     );
//   }
// }
// console.log(this.gasto); 
  
  this.gasto.forEach?.((gast:any)=> this.gastos.push(this.form.group({
        costo      : new FormControl(gast.costo, [Validators.required]),
        cantidad   : new FormControl(gast.cantidad, [Validators.required]) ,
        descripcion: new FormControl(gast.descripcion, [Validators.required]),
        tipo       : new FormControl(gast.tipo, [Validators.required]),
  })))

  }

  postCultivo(){

    const cultivo={
      hectareas: this.formu.value?.hectareas,
      descripcion: this.formu.value?.descripcion,
      fecha_siembre: this.formu.value?.fecha_siembre,
    };

    this._sCul.postCultivo(
      this._crtSer.token,
      this.formu.value?.vereda,
      cultivo
      ).pipe(finalize(()=>{
      }))
    .subscribe({
      next: (data:any)=>{
        // console.log(data);
        this.postGasto(data?.idCultivo);
        this._crtSer.showToastr_success('Cultivo creado')
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this._crtSer.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this._crtSer.showToastr_error(error?.message)
        }
      }
    })
  }

  postGasto(id_cultivo:any){
    this._sGas.postGasto(this._crtSer.token, this.formu?.value?.gastos ,id_cultivo)
    .pipe(finalize(()=>{
      this._crtSer.getCultivo();
    }))
    .subscribe({
      next: (data:any)=>{
        console.log(data);
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this._crtSer.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this._crtSer.showToastr_error(error?.message)
        }
      }
    })
  }

}