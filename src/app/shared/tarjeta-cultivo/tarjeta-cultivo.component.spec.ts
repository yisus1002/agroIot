import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCultivoComponent } from './tarjeta-cultivo.component';

describe('TarjetaCultivoComponent', () => {
  let component: TarjetaCultivoComponent;
  let fixture: ComponentFixture<TarjetaCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
