import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {
   API_URL:string= 'https://iot-restserver-production.up.railway.app/';
  constructor( private toastr: ToastrService) { }
  public opciones:any=[
    {cod:'1', name: 'numero1'},
    {cod:'2', name: 'numero2'},
    {cod:'3', name: 'numero3'},
  ]
    // toast ---------------------------
    showToastr_success(title:string){
      this.toastr.success(`${title}`)
    }
    showToastr_error(title:string){
      this.toastr.error(`${title}`)
    }
}
