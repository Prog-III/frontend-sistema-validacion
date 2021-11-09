import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstadoSolicitudComponent } from './crear-estado-solicitud.component';

describe('CrearEstadoSolicitudComponent', () => {
  let component: CrearEstadoSolicitudComponent;
  let fixture: ComponentFixture<CrearEstadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEstadoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEstadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
