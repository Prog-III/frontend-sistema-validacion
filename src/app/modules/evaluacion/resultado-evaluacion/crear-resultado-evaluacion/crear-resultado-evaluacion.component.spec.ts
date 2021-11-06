import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearResultadoEvaluacionComponent } from './crear-resultado-evaluacion.component';

describe('CrearResultadoEvaluacionComponent', () => {
  let component: CrearResultadoEvaluacionComponent;
  let fixture: ComponentFixture<CrearResultadoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearResultadoEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearResultadoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
