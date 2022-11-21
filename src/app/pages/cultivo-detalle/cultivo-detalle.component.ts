import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cultivo-detalle',
  templateUrl: './cultivo-detalle.component.html',
  styleUrls: ['./cultivo-detalle.component.scss']
})
export class CultivoDetalleComponent implements OnInit {

  public tem:number=65;
  public hum:number=60;
  public ph:number=50;
  constructor() { }

  ngOnInit(): void {
  }

}
