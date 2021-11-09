import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComiteComponent } from './editar-comite.component';

describe('EditarComiteComponent', () => {
  let component: EditarComiteComponent;
  let fixture: ComponentFixture<EditarComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
