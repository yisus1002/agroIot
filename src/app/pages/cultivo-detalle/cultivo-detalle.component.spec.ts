import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivoDetalleComponent } from './cultivo-detalle.component';

describe('CultivoDetalleComponent', () => {
  let component: CultivoDetalleComponent;
  let fixture: ComponentFixture<CultivoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivoDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
