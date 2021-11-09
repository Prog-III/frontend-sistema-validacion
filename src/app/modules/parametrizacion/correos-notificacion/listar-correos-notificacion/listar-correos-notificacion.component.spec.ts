import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCorreosNotificacionComponent } from './listar-correos-notificacion.component';

describe('ListarCorreosNotificacionComponent', () => {
  let component: ListarCorreosNotificacionComponent;
  let fixture: ComponentFixture<ListarCorreosNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCorreosNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCorreosNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
