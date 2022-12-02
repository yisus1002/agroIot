import { GastoService } from './../../services/gasto.service';
import { CultivoService } from './../../services/cultivo.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cultivo-detalle',
  templateUrl: './cultivo-detalle.component.html',
  styleUrls: ['./cultivo-detalle.component.scss']
})
export class CultivoDetalleComponent implements OnInit {

  public tem:number=35;
  public hum:number=90;
  public ph:number=7;
  // public cultivo: any;
  // public gasto:any[]=[];
  constructor(public _sCtr: ControlersService,
              private _sCul: CultivoService,
              private router:Router,
              private activateRoute:ActivatedRoute,
              
    ) {
      this._sCtr.leerToken();
      this.activateRoute.params.subscribe((params:any)=>{
        this.getCultivoDetalle(params['id'])
      })
     }

  ngOnInit(): void {
  }

  getCultivoDetalle(id_cultivo:any){
    this._sCul.getCultivoId(this._sCtr.token, id_cultivo)
    .pipe(finalize(()=>{
      this._sCtr.getGastoCultivoId();
    }))
    .subscribe({
      next: (data:any)=>{
        this._sCtr.cultivo=data;
      },
      error: (error:any)=>{
        if(error?.error?.message){
          this._sCtr.showToastr_error((error?.error.message).toString().toUpperCase())
        }else{
          this._sCtr.showToastr_error(error?.message)
        }
      }
    })
  }

  deletCultivo(id:any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._sCul.deletCultivo(this._sCtr.token, id)
        .pipe(finalize(()=>{
          this.router.navigate(['/'])
        }))
        .subscribe({
          next: (data:any)=>{
            console.log(data);
            this._sCtr.showToastr_success('Cultivo eliminado')
          },
          error: (error:any)=>{
            if(error?.error?.message){
              this._sCtr.showToastr_error((error?.error.message).toString().toUpperCase())
            }else{
              this._sCtr.showToastr_error(error?.message)
            }
          }
        })
      }
    })


  }



}
