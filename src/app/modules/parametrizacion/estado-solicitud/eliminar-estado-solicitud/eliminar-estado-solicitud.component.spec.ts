import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEstadoSolicitudComponent } from './eliminar-estado-solicitud.component';

describe('EliminarEstadoSolicitudComponent', () => {
  let component: EliminarEstadoSolicitudComponent;
  let fixture: ComponentFixture<EliminarEstadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarEstadoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEstadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
