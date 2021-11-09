import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCorreosNotificacionComponent } from './eliminar-correos-notificacion.component';

describe('EliminarCorreosNotificacionComponent', () => {
  let component: EliminarCorreosNotificacionComponent;
  let fixture: ComponentFixture<EliminarCorreosNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCorreosNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCorreosNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
