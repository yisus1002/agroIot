import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public editar:boolean= false;
  public formu!: FormGroup;
  constructor(private form: FormBuilder,) { 
    this.createForm();
    this.loadForm();
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
      password    : ["", [Validators.required, Validators.minLength(8) ], []],
    })
  }
  public loadForm(){
    this.formu.reset({
      name1    : "Jesus",
      name2    : "David",
      lsname1  : "Garcia",
      lsname2  : "Hernandez",
      email    : "yisusgarcia1002@gmail.com",
      password   : "123456789",
    })
  }
  public send(){
    if(this.formu.invalid){
      return Object.values(this.formu.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{
      console.log(this.formu.value);
    }
    
  }
}
