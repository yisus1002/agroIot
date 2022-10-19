import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  passwordIguales(pass1:string, pass2:string){
    return (FormGroup: FormGroup)=>{
      const pass1control = FormGroup.controls[pass1];
      const pass2control = FormGroup.controls[pass2];
      if(pass1control?.value === pass2control?.value){
        pass2control.setErrors(null);
      }else{
        pass2control.setErrors({noEsIgual: true})
      }
    }
  }
}
