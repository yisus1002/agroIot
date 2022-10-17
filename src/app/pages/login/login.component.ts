import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('signUp') sing?: ElementRef;
  @ViewChild('logIn') logg?: ElementRef;
  @ViewChild('container') cont?: ElementRef;

  public btnsig:boolean=false;
  public btnlog:boolean=true;

  constructor(private render2: Renderer2) { }



  ngAfterViewInit(): void {
    this.change();
  }


  ngOnInit(): void {


  }
  change(): void{
    const logIn = this.logg?.nativeElement;
    const signUp = this.sing?.nativeElement;
    const container= this.cont?.nativeElement;
    console.log(logIn)
    this.render2.listen(logIn, 'click', ()=>{
      this.render2.removeClass(container,'right-panel-active');
      this.btnlog=true;
      this.btnsig=false;
      // console.log(this.btnlog)
      
    });
    this.render2.listen(signUp, 'click', ()=>{
      this.render2.addClass(container,'right-panel-active');
      this.btnsig=true;
      this.btnlog=false;
      // console.log(this.btnsig)

    });

  }

  

}
