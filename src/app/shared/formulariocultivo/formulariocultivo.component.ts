import { Event } from '@angular/router';
import { ControlersService } from './../../services/controlers.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterContentInit, Component, OnInit, Input  } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { finalize } from 'rxjs';
// import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-formulariocultivo',
  templateUrl: './formulariocultivo.component.html',
  styleUrls: ['./formulariocultivo.component.scss']
})
export class FormulariocultivoComponent implements OnInit, AfterContentInit {
  
  @Input() namefor!:string;
  public formu!:    FormGroup;
  public gasto :any[]=[];
  // public id_depto:any;


  constructor(
    
    // private validate : ValidatorService,
    private form     : FormBuilder,
    public _crtSer   : ControlersService,
    public _sUbi     : UbicacionService,

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
    },1000)
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
        this._crtSer.opcionesDpto=data
        
      },
      error: (err:any)=>{
        console.log(err);
        
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
          this._crtSer.opcionesMuni=data?.municipios 
        },
        error: (err:any)=>{
          console.log(err);
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
            this._crtSer.opcionesVrda=data?.veredas
          },
          error: (err:any)=>{
            console.log(err);
            
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
        valor       :["", [Validators.required],[]],
        cantidad    :["", [Validators.required],[]],
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
    // this.formu.reset();
    // this.opciones.unshift({
      // cod: '', name: 'Selecione'
    // })
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
  { valor: "", cantidad: "",  descripcion: "" }, 
]
// if(this.gasto){
//   for (let gast of this.gasto){
//     (<FormArray>this.formu.get('gastos')).push(
//       new FormGroup({
//         valor: new FormControl(gast.valor),
//         cantidad: new FormControl(gast.cantidad) ,
//         descripcion: new FormControl(gast.descripcion),
//       })
//     );
//   }
// }
// console.log(this.gasto); 
  
  this.gasto.forEach?.((gast:any)=> this.gastos.push(this.form.group({
        valor      : new FormControl(gast.valor, [Validators.required]),
        cantidad   : new FormControl(gast.cantidad, [Validators.required]) ,
        descripcion: new FormControl(gast.descripcion, [Validators.required]),
  })))

  }

}