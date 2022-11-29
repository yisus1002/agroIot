import { finalize } from 'rxjs';
import { CultivoService } from './../../services/cultivo.service';
import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public cultivos:any[]=[];
  constructor(
    public _sCtr: ControlersService,

     ) { 
      this._sCtr.leerToken();
     }

  ngOnInit(): void {
    this._sCtr.getCultivo()
  }



}
