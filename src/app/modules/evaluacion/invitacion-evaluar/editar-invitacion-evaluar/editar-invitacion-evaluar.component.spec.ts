import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInvitacionEvaluarComponent } from './editar-invitacion-evaluar.component';

describe('EditarInvitacionEvaluarComponent', () => {
  let component: EditarInvitacionEvaluarComponent;
  let fixture: ComponentFixture<EditarInvitacionEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInvitacionEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInvitacionEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
