import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEvaluarSolicitudComponent } from './listar-evaluar-solicitud.component';

describe('ListarEvaluarSolicitudComponent', () => {
  let component: ListarEvaluarSolicitudComponent;
  let fixture: ComponentFixture<ListarEvaluarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEvaluarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEvaluarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
