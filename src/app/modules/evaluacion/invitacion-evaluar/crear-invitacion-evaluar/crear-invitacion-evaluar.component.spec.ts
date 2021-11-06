import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInvitacionEvaluarComponent } from './crear-invitacion-evaluar.component';

describe('CrearInvitacionEvaluarComponent', () => {
  let component: CrearInvitacionEvaluarComponent;
  let fixture: ComponentFixture<CrearInvitacionEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInvitacionEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInvitacionEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
