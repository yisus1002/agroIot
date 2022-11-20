import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariocultivoComponent } from './formulariocultivo.component';

describe('FormulariocultivoComponent', () => {
  let component: FormulariocultivoComponent;
  let fixture: ComponentFixture<FormulariocultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariocultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariocultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
