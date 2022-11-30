import { ControlersService } from './../../services/controlers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public mostrar:boolean = false;
  constructor(
    public _sCtr: ControlersService,

     ) { 
      this._sCtr.leerToken();
      this._sCtr.getCultivo()
      setTimeout(() => {
        this.mostrar=true;
      }, 1000);
     }

  ngOnInit(): void {
  }



}
