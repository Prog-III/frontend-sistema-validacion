import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEvaluacionComponent } from './detalles-evaluacion.component';

describe('DetallesEvaluacionComponent', () => {
  let component: DetallesEvaluacionComponent;
  let fixture: ComponentFixture<DetallesEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
