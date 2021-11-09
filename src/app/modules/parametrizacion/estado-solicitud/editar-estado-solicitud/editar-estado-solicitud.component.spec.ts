import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstadoSolicitudComponent } from './editar-estado-solicitud.component';

describe('EditarEstadoSolicitudComponent', () => {
  let component: EditarEstadoSolicitudComponent;
  let fixture: ComponentFixture<EditarEstadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstadoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
