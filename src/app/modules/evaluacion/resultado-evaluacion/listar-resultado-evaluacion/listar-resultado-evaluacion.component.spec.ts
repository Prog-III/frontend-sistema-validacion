import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarResultadoEvaluacionComponent } from './listar-resultado-evaluacion.component';

describe('ListarResultadoEvaluacionComponent', () => {
  let component: ListarResultadoEvaluacionComponent;
  let fixture: ComponentFixture<ListarResultadoEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarResultadoEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarResultadoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
