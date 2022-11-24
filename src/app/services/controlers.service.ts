import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ControlersService {
   API_URL:string= 'https://iot-restserver-production.up.railway.app/';
  constructor( private toastr: ToastrService) { }
//   {
//     "idDepartamento": 1,
//     "nombre": "CORDOBA",
//     "creteadAt": "2022-11-16T19:14:31.801Z",
//     "updatedAt": "2022-11-16T19:14:31.801Z",
//     "municipios": [
//         {
//             "idMunicipio": 1,
//             "nombre": "MONTERIA",
//             "creteadAt": "2022-11-16T14:15:59.000Z",
//             "updatedAt": "2022-11-16T14:15:59.000Z"
//         }
//     ]
// }
  public opcionesDpto:any=[];
  public opcionesMuni:any=[];
  public opcionesVrda:any=[]; 
    // toast ---------------------------
    showToastr_success(title:string){
      this.toastr.success(`${title}`)
    }
    showToastr_error(title:string){
      this.toastr.error(`${title}`)
    }
}
