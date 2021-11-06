import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInvitacionEvaluarComponent } from './eliminar-invitacion-evaluar.component';

describe('EliminarInvitacionEvaluarComponent', () => {
  let component: EliminarInvitacionEvaluarComponent;
  let fixture: ComponentFixture<EliminarInvitacionEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInvitacionEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInvitacionEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
