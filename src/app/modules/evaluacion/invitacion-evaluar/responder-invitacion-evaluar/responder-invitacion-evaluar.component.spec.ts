import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderInvitacionEvaluarComponent } from './responder-invitacion-evaluar.component';

describe('ResponderInvitacionEvaluarComponent', () => {
  let component: ResponderInvitacionEvaluarComponent;
  let fixture: ComponentFixture<ResponderInvitacionEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderInvitacionEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderInvitacionEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
