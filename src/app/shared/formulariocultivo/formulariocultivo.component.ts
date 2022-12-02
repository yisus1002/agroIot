import { GastoService } from './../../services/gasto.service';
import { ControlersService } from './../../services/controlers.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AfterContentInit, Component, OnInit, Input, DoCheck  } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { finalize } from 'rxjs';
import { CultivoService } from 'src/app/services/cultivo.service';
import Swal from 'sweetalert2';
import { gasto } from 'src/app/models/usuario/gasto.model';
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

      if(this.namefor==='Agregar'){
        this._crtSer.opcionesMuni.unshift({
          idMunicipio:'', nombre: 'Seleccione un municipio'
        })
        this._crtSer.opcionesVrda.unshift({
          idVereda:'', nombre: 'Seleccione una vereda'
        })
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
    
  }

  ngOnInit(): void {
    this._crtSer.getDepartamento();
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
        idGasto     :["", []],
        cantidad    :["", [Validators.required],[]],
        tipo        :["", [Validators.required],[]],
        descripcion :["", [Validators.required],[]],
      })
    )
  }

  public getCtrl(key: string, form: FormGroup) { 
    return  (<FormArray>form.get(key)); 
  }
  public deletGasto(id:any, Gasto:any){
    if(this.namefor==='Agregar'){ 
      this._crtSer.gastos.removeAt(id);
    }else if(this.namefor==='Editar'){
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
          this.deleteGastoId(Gasto?.value.idGasto);
          this._crtSer.gastos.removeAt(id);
        }})
    }

    
  }

  public enviar(){
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
    if(this.namefor==='Agregar'){
      this.postCultivo()
    }else if(this.namefor==='Editar'){
      this.putcultivo()
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
    });
this.gasto=    [];
  this._crtSer.gastos.clear()

  this.gasto.forEach?.((gast:any)=> this._crtSer.gastos.push(this.form.group({        
        idGasto    :new FormControl(gast?.idGasto),
        costo      : new FormControl(gast?.costo, [Validators.required]),
        cantidad   : new FormControl(gast?.cantidad, [Validators.required]),
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
    let gast:gasto[]= this._crtSer.formu?.value?.gastos;
    const gastos=gast.map(({costo,cantidad,descripcion,tipo})=>({
      'costo':costo,
      'cantidad':cantidad,
      'descripcion':descripcion,
      'tipo':tipo,
    }))
    
    this._sGas.postGasto(this._crtSer.token, gastos ,id_cultivo)
    .pipe(finalize(()=>{
      this._crtSer.getCultivo();
      if(this.namefor==='Agregar'){
        this.loadForm();
      }else if(this.namefor==='Editar'){
        this._crtSer.getGastoCultivoIds()
      }
    }))
    .subscribe({
      next: (data:any)=>{
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

  putcultivo(){
    const cultivo={
      hectareas: this._crtSer.formu.value?.hectareas,
      descripcion: this._crtSer.formu.value?.descripcion,
      fecha_siembre: this._crtSer.formu.value?.fecha_siembre+' 13:09:56.624241',
      vereda:{
        idVereda: this._crtSer.formu.value?.vereda
      }
    };
    this._sCul.putCultivo(this._crtSer.token,
      this._crtSer.cultivo?.idCultivo,
      cultivo
      )
      .pipe(finalize(()=>{
        this._crtSer.getCultivoId();
      }))
      .subscribe({
        next: (data:any)=>{
          if(this._crtSer.formu.value?.gastos){
            this.postGasto(data?.idCultivo)
          }
        this._crtSer.showToastr_success('Cultivo editado')
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


  deleteGastoId(id_gasto:any){
    this._sGas.deletGasto(this._crtSer.token,id_gasto)
    .pipe(finalize(()=>{
      this._crtSer.getGastoCultivoIds()
    }))
    .subscribe({
      next: (data:any)=>{

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