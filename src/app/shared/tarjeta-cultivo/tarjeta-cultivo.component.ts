import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlersService } from 'src/app/services/controlers.service';

@Component({
  selector: 'app-tarjeta-cultivo',
  templateUrl: './tarjeta-cultivo.component.html',
  styleUrls: ['./tarjeta-cultivo.component.scss']
})
export class TarjetaCultivoComponent implements OnInit {
  @Input() items:any;
  @Input() index:number=0;
  constructor(
    private router: Router,
    private _sCtrl: ControlersService,
  ) {
    // this._sCtrl.leerToken();
   }

  ngOnInit(): void {
  }
  watchCult(){
    this.router.navigate(['/cultivo-detalle', this.index])
  }
  deletedCult(){
    // console.log(this.index);
    this._sCtrl.deletCUltivo(this.index)

  }

}
