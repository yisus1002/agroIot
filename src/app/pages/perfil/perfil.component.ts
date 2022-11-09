import { finalize } from 'rxjs';
import { ControlersService } from './../../services/controlers.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public editar : boolean    = false;
  public changeC: boolean    = false;
  public formu! : FormGroup         ;
  public user   : any               ;
  public token  : any               ;
  public id     : any               ; 
  // public hide   : boolean    =  true; 
  constructor(private form    : FormBuilder,
              private _sUser  : UsuarioService,
              private _sCtrl  : ControlersService) { 
    this.createForm();
    this.loadForm();
    this.getUser();
  }

  ngOnInit(): void {
  }
  public get name1NoValid(){   return this.formu.get('name1')?.invalid   && this.formu.get('name1')?.touched;};
  public get name2NoValid(){   return this.formu.get('name2')?.invalid   && this.formu.get('name2')?.touched;};
  public get lsname1NoValid(){ return this.formu.get('lsname1')?.invalid && this.formu.get('lsname1')?.touched;};
  public get lsname2NoValid(){ return this.formu.get('lsname2')?.invalid && this.formu.get('lsname2')?.touched;};
  public get email2NoValid(){  return this.formu.get('email')?.invalid   && this.formu.get('email')?.touched; };
  public get passwordNoValid(){  return this.formu.get('password')?.invalid   && this.formu.get('password')?.touched; };

  createForm(){
    this.formu=this.form.group({
      name1    : ["", [Validators.required, Validators.minLength(3) ], []],
      name2    : ["", [Validators.minLength(3)], []],
      lsname1  : ["", [Validators.required, Validators.minLength(3) ], []],
      lsname2  : ["", [Validators.minLength(3)], []],
      email    : ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ], []],
      // password    : ["", [Validators.required, Validators.minLength(8) ], []],
    })
  }
  public loadForm(){
    this.formu.reset({
      name1      : this.user?.nombre1,
      name2      : this.user?.nombre2,
      lsname1    : this.user?.apellido1 ,
      lsname2    : this.user?.apellido2 ,
      email      : this.user?.correo ,
    })
  }
  public send(){ 
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{ 
      this.putUser(); 
    }
  }
  getUser(){
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('id')
    this._sUser.getUserId(this.id, this.token)
    .pipe(finalize(()=>{
      this.loadForm();
      this.editar=false;
      this.changeC=false;
    }))
    .subscribe({
      next: (data:any)=>{
        this.user=data;
      },
      error: (error:any)=>{
        this._sCtrl.showToastr_error((error?.error?.message).toString())        
        localStorage.clear()
        location.reload()
      }
    })
  }
  cambiarContrasena(){
    this.changeC=! this.changeC;
    if(this.changeC===true){
      this.formu=this.form.group({
        ...this.formu.controls,
        password:["", [Validators.required, Validators.minLength(8) ], []]
      });
      this.formu.reset({
        ...this.formu.value,
        password: '',
      })
    }else{
      this.formu.removeControl('password')
      this.loadForm()
    }
  return  this.formu;
  }
  putUser(){
    const usuario={
      nombre1    :this.formu.value?.name1,
      nombre2    :this.formu.value?.name2,
      apellido1  :this.formu.value?.lsname1,
      apellido2  :this.formu.value?.lsname2,
      correo     :this.formu.value?.email,
      contraseña :this.formu.value?.password,
    }
    this._sUser.putUser(this.id,this.token, usuario)
    .pipe(finalize(()=>{
      this.getUser();
    }))
    .subscribe({
      next: (data:any)=>{
        this._sCtrl.showToastr_success(`${data?.nombre1} ${data?.apellido1} datos actualizados`)
      },
      error:(error:any)=>{
       this._sCtrl.showToastr_error(`${error?.error?.message}`)
      }
    })
  }
}
