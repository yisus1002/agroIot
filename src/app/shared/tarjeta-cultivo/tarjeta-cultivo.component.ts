import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
  }
  watchCult(){
    this.router.navigate(['/', this.index])
  }
  deletedCult(){
    console.log(this.index);
    
  }

}
