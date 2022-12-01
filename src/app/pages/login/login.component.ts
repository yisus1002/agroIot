import { ControlersService } from './../../services/controlers.service'; 
import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../models/usuario/usuario.model';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidatorService } from 'src/app/validators/validator.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('signUp') sing?: ElementRef;
  @ViewChild('logIn') logg?: ElementRef;
  @ViewChild('container') cont?: ElementRef;

  public btnsig:boolean=false;
  public btnlog:boolean=true;
  public formulog!: FormGroup;
  public formuSig!: FormGroup;

  constructor(
    private render2  : Renderer2,
    private form     : FormBuilder,
    // private router   : Router,
    private validate : ValidatorService,
    private _sUser   : UsuarioService,
    public _sAuth   : AuthService,
    private _sCtrl   : ControlersService,

    ) {
      this.crateFormlog();
      this.loadForm1();
      this.createForSig();
      this.loadForm2() 
    }

  ngAfterViewInit(): void {
    this.change();
  }

  ngOnInit(): void {}

  change(): void{
    const logIn = this.logg?.nativeElement;
    const signUp = this.sing?.nativeElement;
    const container= this.cont?.nativeElement; 
    this.render2.listen(logIn, 'click', ()=>{
      this.render2.removeClass(container,'right-panel-active');
      this.btnlog=true;
      this.btnsig=false; 
    });
    this.render2.listen(signUp, 'click', ()=>{
      this.render2.addClass(container,'right-panel-active');
      this.btnsig=true;
      this.btnlog=false; 
    });

  };

  public get emailNoValid(){   return this.formulog.get('email')?.invalid    && this.formulog.get('email')?.touched;};
  public get passwordNoValid(){return this.formulog.get('password')?.invalid && this.formulog.get('password')?.touched;};
  public get name1NoValid(){   return this.formuSig.get('name1')?.invalid    && this.formuSig.get('name1')?.touched;};
  public get name2NoValid(){   return this.formuSig.get('name2')?.invalid    && this.formuSig.get('name2')?.touched;};
  public get lsname1NoValid(){ return this.formuSig.get('lsname1')?.invalid  && this.formuSig.get('lsname1')?.touched;};
  public get lsname2NoValid(){ return this.formuSig.get('lsname2')?.invalid  && this.formuSig.get('lsname2')?.touched;};
  public get email2NoValid(){  return this.formuSig.get('email')?.invalid    && this.formuSig.get('email')?.touched; };
  public get pass1NoValid(){   return this.formuSig.get('pass1')?.invalid    && this.formuSig.get('pass1')?.touched; };
  public get pass2NoValid(){ const pass1 =this.formuSig.get('pass1')?.value; const pass2 =this.formuSig.get('pass2')?.value; return (pass1===pass2) ? false : true;};



  public crateFormlog(){
    this.formulog= this.form.group({
      email    : ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ], []],
      password : ["", [Validators.required, Validators.minLength(8)], []],
    })
  };

  public createForSig(){
    this.formuSig = this.form.group({
      name1    : ["", [Validators.required, Validators.minLength(3) ], []],
      name2    : ["", [Validators.minLength(3)], []],
      lsname1  : ["", [Validators.required, Validators.minLength(3) ], []],
      lsname2  : ["", [Validators.minLength(3)], []],
      email    : ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ], []],
      pass1    : ["", [Validators.required, Validators.minLength(8) ], []],
      pass2    : ["", [Validators.required, Validators.minLength(8) ], []],
    },{
      validators : this.validate.passwordIguales('pass1', 'pass2')
    });
  };

  public loadForm1(){
    this.formulog.reset({
      email     : '',
      password  : '',
    });
  };

  public loadForm2(){
    this.formuSig.reset({
      name1    : '',
      name2    : '',
      lsname1  : '',
      lsname2  : '',
      email    : '',
      pass1    : '',
      pass2    : '',
    })
  }

  public login(){ 
    if(this.formulog.invalid){  
      
      return Object.values(this.formulog.controls).forEach(controls=>{
        controls.markAllAsTouched()
      })
    }else{ 
      this._sAuth.getToken(this.formulog.value.email, this.formulog.value.password);
    }
  } 
  public sigup(){ 
    if(this.formuSig.invalid){ 
      return Object.values(this.formuSig.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{ 
      const user={ 
        nombre1: this.formuSig.value.name1,
        nombre2: this.formuSig.value.name2,
        apellido1: this.formuSig.value.lsname1,
        apellido2: this.formuSig.value.lsname2,
        correo: this.formuSig.value.email,
        contraseña: this.formuSig.value.pass1,        
      }
      this.createUser(user)
      
    }
  } 

  createUser(user:Usuario){

    this._sAuth.habilitar=true;
    this._sUser.postUser(user)
    .pipe(  finalize(()=>{
      this._sAuth.habilitar=false;
     })  )
    .subscribe({
      next: (data:any)=>{
        this._sAuth.getToken(user.correo, user.contraseña); 
        this.loadForm2()
      },
      error:(error:any)=>{
        if(error?.error?.message){
          this._sCtrl.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this._sCtrl.showToastr_error(error?.message)
        }
      }
    })
  }

  
}