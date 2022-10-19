import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/validators/validator.service';

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
    private render2: Renderer2,
    private form:FormBuilder,
    private validate:ValidatorService,
    ) {
      this.crateFormlog();
      this.loadForm1();
      this.createForSig();
      // this.loadForm2()
    }

  ngAfterViewInit(): void {
    this.change();
  }

  ngOnInit(): void {}

  change(): void{
    const logIn = this.logg?.nativeElement;
    const signUp = this.sing?.nativeElement;
    const container= this.cont?.nativeElement;
    // console.log(logIn)
    this.render2.listen(logIn, 'click', ()=>{
      this.render2.removeClass(container,'right-panel-active');
      this.btnlog=true;
      this.btnsig=false;
      // console.log(this.btnlog)
    });
    this.render2.listen(signUp, 'click', ()=>{
      this.render2.addClass(container,'right-panel-active');
      this.btnsig=true;
      this.btnlog=false;
      // console.log(this.btnsig)
    });

  };

  public get emailNoValid(){   return this.formulog.get('email')?.invalid    && this.formulog.get('email')?.touched;};
  public get passwordNoValid(){return this.formulog.get('password')?.invalid && this.formulog.get('password')?.touched;};

  public get name1NoValid(){   return this.formuSig.get('name1')?.invalid   && this.formuSig.get('name1')?.touched;};
  public get name2NoValid(){   return this.formuSig.get('name2')?.invalid   && this.formuSig.get('name2')?.touched;};
  public get lsname1NoValid(){ return this.formuSig.get('lsname1')?.invalid && this.formuSig.get('lsname1')?.touched;};
  public get lsname2NoValid(){ return this.formuSig.get('lsname2')?.invalid && this.formuSig.get('lsname2')?.touched;};
  public get email2NoValid(){  return this.formuSig.get('email')?.invalid   && this.formuSig.get('email')?.touched; };
  public get pass1NoValid(){   return this.formuSig.get('pass1')?.invalid   && this.formuSig.get('pass1')?.touched; };
  public get pass2NoValid(){ 
    const pass1 =this.formuSig.get('pass1')?.value;
    const pass2 =this.formuSig.get('pass2')?.value;
    return (pass1===pass2) ? false : true;
   };



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
      email     : "",
      passworf : "",
    });
  };

  public loadForm2(){
    this.formuSig.reset({
      name1    : "Jesus",
      name2    : "David",
      lsname1  : "Garcia",
      lsname2  : "Hernandez",
      email    : "yisusgarcia1002@gmail.com",
      pass1    : "123456789",
      pass2    : "123456789",
    })
  }

  public login(){
    console.log(this.formulog.valid);
    console.log(this.formulog);
    if(this.formulog.invalid){
      console.log('datos invalidos');
      console.log(this.formulog.value);
      return Object.values(this.formulog.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{
      console.log('data enviada');
      console.log(this.formulog.value)
    }
  } 
  public sigup(){
    console.log(this.formuSig.valid);
    console.log(this.formuSig);
    if(this.formuSig.invalid){
      console.log('datos invalidos');
      console.log(this.formuSig.value);
      return Object.values(this.formuSig.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{
      console.log('data enviada');
      console.log(this.formuSig.value)
    }
  } 
}