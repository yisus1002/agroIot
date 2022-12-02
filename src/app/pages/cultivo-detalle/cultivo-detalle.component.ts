import { CultivoService } from './../../services/cultivo.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, finalize } from 'rxjs';
import Swal from 'sweetalert2';
// import * as jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cultivo-detalle',
  templateUrl: './cultivo-detalle.component.html',
  styleUrls: ['./cultivo-detalle.component.scss']
})
export class CultivoDetalleComponent implements OnInit {

  public tem:number=35;
  public hum:number=90;
  public ph:number=7;
  
  @ViewChild('pdf') cont?: ElementRef;
  // public cultivo: any;
  // public gasto:any[]=[];
  constructor(public _sCtr: ControlersService,
              private render2  : Renderer2,
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
  downloadPDF(){
    const pdf = this.cont?.nativeElement; 
    const doc = new jsPDF();
    html2canvas(pdf).then((canvas)=>{
      console.log(canvas);
      var imgHeigth = canvas.height * 208/ canvas.width;
      var imgData =canvas.toDataURL('img/png');
      doc.addImage(imgData, 0,0,208,imgHeigth)
      doc.save('Reporte.pdf')
      
    })
    console.log(pdf);
    
  }



}
