import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInvitacionEvaluarComponent } from './listar-invitacion-evaluar.component';

describe('ListarInvitacionEvaluarComponent', () => {
  let component: ListarInvitacionEvaluarComponent;
  let fixture: ComponentFixture<ListarInvitacionEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInvitacionEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInvitacionEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
