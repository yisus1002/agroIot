import { GastoService } from './../../services/gasto.service';
import { CultivoService } from './../../services/cultivo.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, finalize } from 'rxjs';

@Component({
  selector: 'app-cultivo-detalle',
  templateUrl: './cultivo-detalle.component.html',
  styleUrls: ['./cultivo-detalle.component.scss']
})
export class CultivoDetalleComponent implements OnInit {

  public tem:number=65;
  public hum:number=60;
  public ph:number=50;
  public cultivo: any;
  public gasto:any[]=[];
  constructor(private _sCtr: ControlersService,
              private _sCul: CultivoService,
              private _sGas: GastoService,
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
      this.getGastoCultivoId();
    }))
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        this.cultivo=data;
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

  getGastoCultivoId(){
    this._sGas.getGastoCultivoId(this._sCtr.token, this.cultivo?.idCultivo)
    .pipe(finalize(()=>{

    }))
    .subscribe({
      next: (data:any)=>{
        this.gasto=data;
        console.log(data);
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

}
