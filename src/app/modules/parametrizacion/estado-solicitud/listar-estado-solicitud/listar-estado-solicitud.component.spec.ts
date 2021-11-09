import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstadoSolicitudComponent } from './listar-estado-solicitud.component';

describe('ListarEstadoSolicitudComponent', () => {
  let component: ListarEstadoSolicitudComponent;
  let fixture: ComponentFixture<ListarEstadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstadoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
