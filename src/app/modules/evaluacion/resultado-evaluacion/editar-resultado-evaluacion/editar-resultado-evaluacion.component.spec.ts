import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarResultadoEvaluacionComponent } from './editar-resultado-evaluacion.component';

describe('EditarResultadoEvaluacionComponent', () => {
  let component: EditarResultadoEvaluacionComponent;
  let fixture: ComponentFixture<EditarResultadoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarResultadoEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarResultadoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
