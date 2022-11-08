import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {

  constructor( private toastr: ToastrService) { }

    // toast ---------------------------
    showToastr_success(title:string){
      this.toastr.success(`${title}`)
    }
    showToastr_error(title:string){
      this.toastr.error(`${title}`)
    }
}
