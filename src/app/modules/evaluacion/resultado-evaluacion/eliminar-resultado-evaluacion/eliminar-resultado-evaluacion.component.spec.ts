import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarResultadoEvaluacionComponent } from './eliminar-resultado-evaluacion.component';

describe('EliminarResultadoEvaluacionComponent', () => {
  let component: EliminarResultadoEvaluacionComponent;
  let fixture: ComponentFixture<EliminarResultadoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarResultadoEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarResultadoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
