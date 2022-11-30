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
      if(this.namefor==='Agregar'){
        this._crtSer.formu.get('municipio')?.disable()
        this._crtSer.formu.get('vereda')?.disable()
      }else if(this.namefor==='Editar'){
        this._crtSer.formu.get('municipio')?.enable()
        this._crtSer.formu.get('vereda')?.enable()

      }
    },1000);
    this._crtSer.leerToken();
  }
  ngDoCheck(): void {
    
  }



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
    let id= this._crtSer.formu.get('departamento')?.value;
    if(id>0){
      this._sUbi.getDepartamentoId(id)
      .pipe(finalize(()=>{
        this._crtSer.opcionesMuni.unshift({
          idMunicipio:'', nombre: 'Seleccione un municipio'
        }); 
      this._crtSer.formu.get('municipio')?.enable()
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
      this._crtSer.formu.get('municipio')?.disable()
      this._crtSer.formu.get('vereda')?.disable()
    }
  }

  getVereda(){
      let id =this._crtSer.formu.get('municipio')?.value;
      if(id>0){
        this._sUbi.getMunicipioId(id)
        .pipe(finalize(()=>{
          this._crtSer.opcionesVrda.unshift({
            idVereda:'', nombre: 'Seleccione una vereda'
          })
          this._crtSer.formu.get('vereda')?.enable()
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
        this._crtSer.formu.get('vereda')?.disable()
      }
  }

  


  public createForm(){
    this._crtSer.formu=this.form.group({ 
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
    this._crtSer.gastos.push(
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
    this._crtSer.gastos.removeAt(id);
    console.log(id);
    
  }

  public enviar(){
    console.log(this._crtSer.formu.value);
    console.log(this._crtSer.formu.valid);
    if(this._crtSer.formu.invalid){
      return Object.values(this._crtSer.formu.controls).forEach(controls=>{
        if(controls instanceof FormGroup){
          Object.values(controls.controls).forEach(controls=>controls.markAllAsTouched())
        }else{
          controls.markAllAsTouched();
        }
      });
    }
    console.log(this._crtSer.formu.value)
    if(this.namefor==='Agregar'){
      this.postCultivo()
    }else if(this.namefor==='Editar'){
      console.log(this._crtSer.formu.value);
    }

  }
  public loadForm(){
    this._crtSer.formu.reset({
      hectareas :"",
      descripcion :"",
      fecha_siembre :"",
      departamento :"",
      municipio :"",
      vereda :"",
      // gastos:
    });
this.gasto=    [];
  this._crtSer.gastos.clear()

  this.gasto.forEach?.((gast:any)=> this._crtSer.gastos.push(this.form.group({
        costo      : new FormControl(gast?.costo, [Validators.required]),
        cantidad   : new FormControl(gast?.cantidad, [Validators.required]) ,
        descripcion: new FormControl(gast?.descripcion, [Validators.required]),
        tipo       : new FormControl(gast?.tipo, [Validators.required]),
  })))

  }

  postCultivo(){

    const cultivo={
      hectareas: this._crtSer.formu.value?.hectareas,
      descripcion: this._crtSer.formu.value?.descripcion,
      fecha_siembre: this._crtSer.formu.value?.fecha_siembre+' 13:09:56.624241',
    };

    this._sCul.postCultivo(
      this._crtSer.token,
      this._crtSer.formu.value?.vereda,
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
    this._sGas.postGasto(this._crtSer.token, this._crtSer.formu?.value?.gastos ,id_cultivo)
    .pipe(finalize(()=>{
      this._crtSer.getCultivo();
      this.loadForm();
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