import { CultivoService } from './../../services/cultivo.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, finalize } from 'rxjs';
import Swal from 'sweetalert2';
// import * as jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IotService } from 'src/app/services/iot.service';
import { RegistroResponse } from '../../models/iot-response';
import { Informe, InformeActualResponse } from 'src/app/models/cultivo-response';

@Component({
  selector: 'app-cultivo-detalle',
  templateUrl: './cultivo-detalle.component.html',
  styleUrls: ['./cultivo-detalle.component.scss']
})
export class CultivoDetalleComponent implements OnInit,AfterContentInit {

  public tem:number=0;
  public hum:number=0;
  public ph:number=0;

  public id:any;

  public registro?:Informe;

  @ViewChild('pdf') cont?: ElementRef;
  // public cultivo: any;
  // public gasto:any[]=[];
  constructor(public _sCtr: ControlersService,
              private _sCul: CultivoService,
              private _iot  : IotService,
              // private render2  : Renderer2,
              private router:Router,
              private activateRoute:ActivatedRoute,

              ) {
                this._sCtr.leerToken();
                this.activateRoute.params.subscribe((params:any)=>{
        this.getCultivoDetalle(params['id'])
        this.id=params['id']
        console.log(params);

      })
     }
     ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getIotCultivodetalle(this.id)
      }, 180000);

      setTimeout(() => {
        console.log(this.tem);

        if(this.tem>=0 && this.hum>=0 && this.ph>=0){
          this.crearRegistro();
        }
      }, 5000);
  }

  // getRegistro(){
  //   this._iot.getRegistro(this.id,this._sCtr.token)
  //   .subscribe({
  //     next: (res:RegistroResponse[]) => {
  //       let reg= res[0];
  //       this.registro=reg
  //       console.log(this.registro);
  //   },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  crearRegistro(){
    this._iot.postRegistro(this.id, this._sCtr.token)
    .pipe(finalize(()=>{
      // this.getRegistro();
    }))
    .subscribe({
      next:(data)=>{
        // console.log(data);

        this.registro={
          temperaturaMinima:data?.temperaturaMinima,
          temperaturaMaxima:data?.humedadMaxima,
          humedadMinima:data?.humedadMinima,
          humedadMaxima:data?.humedadMaxima,
          phMinimo:data?.phMinimo,
          phMaximo:data?.phMaximo,
        }
        console.log(this.registro);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCultivoDetalle(id_cultivo:any){
    this._sCul.getCultivoId(this._sCtr.token, id_cultivo)
    .pipe(finalize(()=>{
      this._sCtr.getGastoCultivoId();
    }))
    .subscribe({
      next:  (data)=>{
        this._sCtr.cultivo=data;
        console.log(data);

        let iot= data.iots[0]
        if(!iot){
         this.getIotCultivodetalle(this.id)
        }else{
          this.tem=iot?.temperatura;
          this.hum=iot?.humedad;
          this.ph=iot?.ph;
        }
        // console.log(iot);
        this.registro={
          ...data.informes[0]
        }
        if(!this.registro){
          this.registro= {
            temperaturaMinima:this.tem,
            temperaturaMaxima:this.tem,
            humedadMinima:this.hum,
            humedadMaxima:this.hum,
            phMinimo:this.ph,
            phMaximo:this.ph,
          }
        }else{

        }
        // console.log(data.informes[0]);

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

  getIotCultivodetalle(id_cultivo:any){
    this._iot.getIotCultivoId(id_cultivo, this._sCtr.token)
    .pipe(finalize(()=>{

    }))
    .subscribe({
      next: (iots)=>{
        console.log(iots);
        let iot= iots[iots.length-1]
        // console.log(iot);
        this.tem=iot?.temperatura;
        this.hum=iot?.humedad;
        this.ph=iot?.ph;
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
            // console.log(data);
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
  downloadPDF(){
    const pdf = this.cont?.nativeElement;
    const doc = new jsPDF();
    html2canvas(pdf).then((canvas)=>{
      // console.log(canvas);
      var imgHeigth = canvas.height * 208/ canvas.width;
      var imgData =canvas.toDataURL('img/png');
      doc.addImage(imgData, 0,0,208,imgHeigth)
      doc.save('Reporte.pdf')

    })
    // console.log(pdf);

  }
}
