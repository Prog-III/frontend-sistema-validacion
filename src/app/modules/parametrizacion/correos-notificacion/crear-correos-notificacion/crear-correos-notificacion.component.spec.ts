import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCorreosNotificacionComponent } from './crear-correos-notificacion.component';

describe('CrearCorreosNotificacionComponent', () => {
  let component: CrearCorreosNotificacionComponent;
  let fixture: ComponentFixture<CrearCorreosNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCorreosNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCorreosNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
