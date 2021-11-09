import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCorreosNotificacionComponent } from './editar-correos-notificacion.component';

describe('EditarCorreosNotificacionComponent', () => {
  let component: EditarCorreosNotificacionComponent;
  let fixture: ComponentFixture<EditarCorreosNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCorreosNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCorreosNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
