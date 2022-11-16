import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {
   API_URL:string= 'https://iot-restserver-production.up.railway.app/';
  constructor( private toastr: ToastrService) { }

    // toast ---------------------------
    showToastr_success(title:string){
      this.toastr.success(`${title}`)
    }
    showToastr_error(title:string){
      this.toastr.error(`${title}`)
    }
}
