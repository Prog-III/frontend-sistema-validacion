import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComiteComponent } from './crear-comite.component';

describe('CrearComiteComponent', () => {
  let component: CrearComiteComponent;
  let fixture: ComponentFixture<CrearComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
